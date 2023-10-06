/**********************************************************************
■ Filename: ErrorPane.jsx
◘ Description:
    • React Component
    • A interface to display errors generated from back-end code, 
      based upon a global error state in the front-end code.
      
    ◘ Details:
      Errors are generated in the backend Express JS api.
      A custom Javascript error class is used when throwing errors
      in any particular route on the backend. Error handling 
      middleware handles the errors based upon the custom type.
      In the event of an error, JSON of the error will be sent to
      the front end code. A global error state is used via the 
      useContext hook of React. As errors occur, this component
      will open an Mui Drawer component, and display an array of
      errors to the user. 
    
    ◘ Behavior:
      Most errors will be cleared by closing the pane (click away).
      Upon session expiration or CSRF attack, the next call to the 
      backend will trigger an authentication error. 
      This will re-route the user to the <LoginPage> 

◘ Custom Dependencies: ø 
◘ State: √ 
    ○ Global : √
    ○ Local  : √ 
• Theme: √
**********************************************************************/

// React
import React, { useState, useEffect, Fragment } from "react";

// 3rd party
import { useNavigate } from 'react-router-dom'; 
import { v4 as uuidv4 } from 'uuid';

// Custom Hooks
import useAuthenticationContext from "../../hooks/useAuthenticationContext";
import useErrorContext from "../../hooks/useErrorContext";

// Components
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

// Images & Styling
import Blast from "../../images/backgrounds/Blast.png";
import { useTheme } from "@emotion/react";
import { styled } from "@mui/material";

const ErrorPane = () => {
    const { dispatch: dispatchAuth } = useAuthenticationContext();
    const { errors, showErrors, dispatch: dispatchError } = useErrorContext();
    const navigate = useNavigate();
    const theme = useTheme();
    
    const [isOpen, setIsOpen] = useState(false);
    

    const closeDrawer = async() => {
        setIsOpen(false);
        if(await checkIfLoggedInByErrorState(errors)){
            await redirectToLoginPage();
        }
        dispatchError({ type: 'CLEAR_ERROR' });
    }

    /* *********************************************************************
        Name: checkIfLoggedInByErrorState
        Dependencies (backend):
            Error.custom.class.js
                contains: AuthenticationError (Object.key = 'authentication') -or-
                contains: CSRFError (Object.key = 'authentication')
            Error.handler.js
                will throw an instance of AuthenticationError
                when user session is expired -or- CSRFError when
                the CSRF token from the current user and the server
                do not match
            authenticate.js 
                route protection for backend
                looks for existance of valid session token
            csrfProtection.js
                CSRF attack protection for backend api.
                The current user receives a new CSRF Token
                which is validated by this middleware file.
            
            Description:
                This method will search for existance of 'authentication'
                member in errors array (the error state).

                Flow:
                1. route protected by authenticate.js
                2. if session expired, will throw an
                   instance of AuthenticationError
                2b. if the CSRF token is invalid an 
                   instance of CSRFError is thrown
                3. Error.handler.js catches error(s) &
                   sends it/them to front end
                4. 'errors' state changes to hold the
                   error
                5. ErrorPane reveals error state to user
                
    ************************************************************************/
    const checkIfLoggedInByErrorState = async(errors) => {
        if(errors && errors.length){
            let keys = Object.keys(errors[0]);

            // This key is found on AuthenticationError & CSRFError
            if(keys.includes('authentication')){
                return true;
            } else {
                return false;
            }
        }
    }

    const redirectToLoginPage = async() => {
        await dispatchError({ type: 'CLEAR_ERROR'});
        await dispatchAuth({ type: 'LOGOUT'});
        navigate('/login');
    }

    useEffect(() => {
        if(showErrors){
            setIsOpen(true);
        }
    }, [showErrors]);

    return(
        <Fragment>
            <Drawer
                anchor="left"
                open={isOpen}
                onClick={closeDrawer}
                PaperProps={{
                    sx: {
                        backgroundColor: theme.palette.error.main,
                        backgroundImage: `url(${Blast})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'bottom',
                        backgroundSize: 'contain',
                        minWidth: '20vw',
                    }
                }}
            >
                <Typography
                    variant="h6"
                    sx={{
                        ml: '1vw',
                        mt: '1vh'
                    }}
                >
                    Errors!
                </Typography>              
                <List>
                    { errors && errors.map((err) => {
                        return <React.Fragment key={uuidv4()}>
                                <ErrorPaper elevation={6}>
                                    { Object.keys(err).map((key) => {
                                        return <ErrorListItem key={uuidv4()}>
                                            <Paper sx={{ p: '1%' }}>
                                                {`${key} :` } {err[key]}
                                            </Paper>
                                        </ErrorListItem> 
                                    })}
                                </ErrorPaper>
                            </React.Fragment>
                        })
                    }
                </List>
                
            </Drawer>
        </Fragment>
    );
}

const ErrorListItem = styled(ListItem)(({ theme }) => ({
    color: theme.palette.error.dark,
    textShadow: `1px 1px 2px ${theme.palette.error.contrastText}`
}));

const ErrorPaper = styled(Paper)(({ theme }) => ({
    marginLeft: '2%',
    marginRight: '2%',
    marginTop: '3%',
    marginBottom: '3%',
    background: 'transparent'
}));

export default ErrorPane;




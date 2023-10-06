/************************************************************************
 ◘ filename: HomePage.jsx 
 ◘ Description:
    Home page for the OddJobber App. Contains access to the Login &
    Signup forms.
 ************************************************************************/

// React
import { Fragment } from 'react';

// Custom Hooks
import useAuthenticationContext from '../hooks/useAuthenticationContext';

// Mui Components
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import FollowTheSignsIcon from '@mui/icons-material/FollowTheSigns';
import HandshakeIcon from '@mui/icons-material/Handshake';

// Custom Components
import HomeLayout from "../layouts/HomeLayout";
import ModalFormWrapper from '../components/general/ModalFormWrapper';
import LoginForm from '../components/AuthN/LoginForm';
import SignupForm from '../components/AuthN/SignupForm';

// Styling
import { useTheme } from '@emotion/react';

const HomePage = () => {
    const theme = useTheme();

    return(
        <HomeLayout>
            <Typography
                variant="h5"
                color="textSecondary"
                sx={{
                    mt: '4vh',
                    textAlign: 'center',
                }}
            >
                Welcome to the <b><i>OddJobber</i></b> community.
            </Typography> 
            <Typography 
                variant="h4"
                sx={{
                    textAlign: "center"
                }}
            >
                Simple connections. It's what we thrive on.
            </Typography>
            <Paper
                elevation={1}
                sx={{ 
                    mt: '15vh', 
                    p: '1%',
                    color: theme.palette.secondary.dark,
                    textShadow: `1px 1px 1px ${theme.palette.error.contrastText}`,
                    textAlign: 'center',
                    backgroundColor: theme.palette.secondary.light
                }}
            >
                <Typography 
                    variant="h6" 
                >
                    Ever find yourself as a home owner questioning where to look for reliable
                    yet affordable help? Maybe you're just hoping to make a few extra bucks
                    on the weekends. We can facilitate the solution. Sign up at no cost on our
                    platform. Members can create projects, manage skill-sets, and request help
                    from other members. Members are both employer and employee.    
                </Typography> 
            </Paper>
            <AuthNControls />
        </HomeLayout>
    )
}

const AuthNControls = () => {
    const { user } = useAuthenticationContext();

    return(
        <Fragment>
            { !user && (
                <Grid 
                    container 
                    direction="column"
                    rowSpacing={2}
                    sx={{
                        mt: '2vh'
                    }}
                >
                    <Grid item>
                        <ModalFormWrapper 
                            buttonLabel="LOGIN" 
                            icon={<FollowTheSignsIcon />}
                        >
                            <LoginForm />
                        </ModalFormWrapper>
                    </Grid>
                    <Grid item>
                        <ModalFormWrapper 
                            buttonLabel="SIGN UP" 
                            icon={<HandshakeIcon />}
                        >
                            <SignupForm />
                        </ModalFormWrapper>
                    </Grid>
                </Grid>
            )}
        </Fragment>
    )
}

export default HomePage;
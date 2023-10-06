/*******************************************************
■ Filename: DeleteAccountForm.jsx
◘ Description:
    • React Component
    • Form to remove a user from the OddJobber App.
      The form also removes any projects associated
      with the user irrespective of deadline or status

◘ Custom Dependencies: ø 
◘ State: √ 
    ○ Global : √
    ○ Local  : √ 
• Theme: √
*********************************************************/

// React
import { useState } from "react";

// Custom Hooks
import useAuthenticationContext from "../../hooks/useAuthenticationContext";
import useUpdateUser from "../../hooks/useUpdateUser";

// Mui Components
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button";

// Icons & Styling
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { useTheme } from "@emotion/react";
    
const DeleteAccountForm = () => {
    const { user } = useAuthenticationContext();
    const theme = useTheme();

    // Global State
    const { isLoading, deleteAccount } = useUpdateUser();
    
    // Local State
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // Local State-Errors
    const [usernameError, setUsernameError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);

    const deleteHandler = async(e) => {
        setUsernameError(false);
        setPasswordError(false);

        if(username === ''){
            setUsernameError(true);
        }
        if(password === ''){
            setPasswordError(true);
        }

        e.preventDefault();
        await deleteAccount(username, password, user.csrfToken);
        setUsername('');
        setPassword('');
    }
    return(
        <Box
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={deleteHandler}
            sx={{ p: '1%', backgroundColor: theme.palette.error.dark }}
        >
            <DeleteFormHeader />
            <TextField
                type="text"
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                fullWidth
                variant="outlined"
                error={usernameError}
                sx={{ 
                    mt: '1%', 
                    mb: '1%',
                    input: {
                        color: theme.palette.primary.contrastText
                    }
                }}
            />
            <TextField
                type="password"
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                fullWidth
                variant="outlined"
                error={passwordError}
                sx={{ 
                    mt: '1%', 
                    mb: '1%',
                    input: {
                        color: theme.palette.primary.contrastText
                    }
                }}
            />
            <Button 
                variant="contained"
                type="submit"
                disabled={isLoading}
                fullWidth
                sx={{ backgroundColor: theme.palette.error.main }}
            >
                Delete Account
            </Button>
        </Box>
    )
}

const DeleteFormHeader = () => {
    const theme = useTheme();
    return(
        <Grid container alignItems="center" justifyContent="space-evenly">
            <Grid container alignItems="center" justifyContent="space-evenly">
                <WarningSymbol />
                <Typography variant="h4" sx={{ color: theme.palette.error.main }}>
                    WARNING!  
                </Typography>
                <WarningSymbol />
            </Grid>
            <Grid item>
                <Typography variant="h6" sx={{ color: theme.palette.error.main }}>
                    Submitting this form will permanently delete your account
                </Typography>
            </Grid>
        </Grid>
    )
}

const WarningSymbol = () => {
    const theme = useTheme();
    return(
        <WarningAmberIcon 
            sx={{ 
                color: theme.palette.error.main,
                backgroundColor: theme.palette.secondary.dark,
                borderRadius: '80px',
                p: '1%' 
            }}
        />
    )
}

export default DeleteAccountForm;
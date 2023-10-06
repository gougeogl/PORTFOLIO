/*******************************************************
■ Filename: UpdateUsernameForm.jsx
◘ Description:
    • React Component
    • Form to update the currently logged-in user's
      username. The user MUST authenticate themselves
      by entering their old username & password.
      The validation occurs on the backend server.

◘ Custom Dependencies: ø 
◘ State: √ 
    ○ Global : √
    ○ Local  : √ 
• Theme: ø
*********************************************************/

// React
import { useState } from "react";

// Custom Hooks
import useUpdateUser from "../../hooks/useUpdateUser";

// Mui Components
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button";

const UpdateUsernameForm = () => {
    // Global State
    const { isLoading, user, updateUsername } = useUpdateUser();

    // Local State
    const [old_username, setOldUsername] = useState('');
    const [password, setPassword] = useState('');
    const [new_username, setNewUsername] = useState('');

    // Local State-Errors
    const [oldUsernameError, setOldUsernameError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);
    const [newUsernameError, setNewUsernameError] = useState(null);

    const updateHandler = async(e) => {
        setOldUsernameError(false);
        setPasswordError(false);
        setNewUsernameError(false);

        if(old_username === ''){
            setOldUsernameError(true);
        }
        if(password === ''){
            setPasswordError(true);
        }
        if(new_username === ''){
            setNewUsernameError(true);
        }

        e.preventDefault();
        await updateUsername(old_username, password, new_username, user.csrfToken);
        setOldUsername('');
        setPassword('');
        setNewUsername('');
    }
    return(
        <Box
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={updateHandler}
            sx={{
                p: '1%'
            }}
        >
            <Typography
                variant="h4"
            >
                Update Username Credentials
            </Typography>
            <TextField
                type="text"
                label="Old Username"
                value={old_username}
                onChange={(e) => setOldUsername(e.target.value)}
                required
                fullWidth
                variant="outlined"
                error={oldUsernameError}
                sx={{
                    mt: '1%',
                    mb: '1%'
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
                    mb: '1%'
                }}
            />
            <TextField
                type="text"
                label="New Username"
                value={new_username}
                onChange={(e) => setNewUsername(e.target.value)}
                required
                fullWidth
                variant="outlined"
                error={newUsernameError}
                sx={{
                    mt: '1%',
                    mb: '1%'
                }}
            />
            <Button 
                variant="contained"
                type="submit"
                disabled={isLoading}
                fullWidth
            >
                Update Username
            </Button>
        </Box>
    )
}

export default UpdateUsernameForm;
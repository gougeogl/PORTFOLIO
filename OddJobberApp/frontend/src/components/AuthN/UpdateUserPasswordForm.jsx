/*******************************************************
■ Filename: UpdateUserPasswordForm.jsx
◘ Description:
    • React Component
    • Form to update the currently logged-in user's
      password. The user MUST authenticate themselves
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

const UpdateUserPasswordForm = () => {
    // Global State
    const { isLoading, user, updateUserPassword } = useUpdateUser();

    // Local State
    const [username, setUsername] = useState('');
    const [old_password, setOldPassword] = useState('');
    const [new_password, setNewPassword] = useState('');

    // Local State-Errors
    const [usernameError, setUsernameError] = useState(null);
    const [oldPasswordError, setOldPasswordError] = useState(null);
    const [newPasswordError, setNewPasswordError] = useState(null);

    const updateHandler = async(e) => {
        setUsernameError(false);
        setOldPasswordError(false);
        setNewPasswordError(false);

        if(username === ''){
            setUsernameError(true);
        }
        if(old_password === ''){
            setOldPasswordError(true);
        }
        if(new_password === ''){
            setNewPasswordError(true);
        }

        e.preventDefault();
        await updateUserPassword(username, old_password, new_password, user.csrfToken);
        setUsername('');
        setOldPassword('');
        setNewPassword('');
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
                Update Password Credentials
            </Typography>
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
                    mb: '1%'
                }}
            />
            <TextField
                type="password"
                label="Old Password"
                value={old_password}
                onChange={(e) => setOldPassword(e.target.value)}
                required
                fullWidth
                variant="outlined"
                error={oldPasswordError}
                sx={{
                    mt: '1%',
                    mb: '1%'
                }}
            />
            <TextField
                type="password"
                label="New Password"
                value={new_password}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                fullWidth
                variant="outlined"
                error={newPasswordError}
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
                Update
            </Button>
        </Box>
    )
}

export default UpdateUserPasswordForm;
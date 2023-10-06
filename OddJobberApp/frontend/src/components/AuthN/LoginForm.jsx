/*******************************************************
■ Filename: LoginForm.jsx
◘ Description:
    • React Component
    • Form used when a user logs into the OddJobber App

◘ Custom Dependencies: ø 
◘ State: √ 
    ○ Global : √
    ○ Local  : √ 
• Theme: ø
*********************************************************/

// React
import { useState } from "react";

// Custom Hooks
import useLogin from '../../hooks/useLogin';

// Mui Components
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // Local State-Errors
    const [nameErr, setNameErr] = useState(null);
    const [pwErr, setPwErr] = useState(null);

    // Hooks
    const { login, isLoading } = useLogin();

    const loginHandler = async(e) => {
        setNameErr(false);
        setPwErr(false);

        if(username === ''){
            setNameErr(true);
        }
        if(password === ''){
            setPwErr(true);
        }

        e.preventDefault();
        await login(username, password);
        setUsername('');
        setPassword('');
    }
    
    return(
        <Box
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={loginHandler}
            sx={{
                p: '1%'
            }}
        >
            <Typography
                variant="h4"
            >
                Login
            </Typography>
            <TextField
                type="text"
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                fullWidth
                variant="outlined"
                error={nameErr}
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
                error={pwErr}
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
                Login
            </Button>
        </Box>
    )
}

export default LoginForm;
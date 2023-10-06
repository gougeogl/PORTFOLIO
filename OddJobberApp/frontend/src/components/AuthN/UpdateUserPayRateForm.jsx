/*******************************************************
■ Filename: UpdateUserPayRateForm.jsx
◘ Description:
    • React Component
    • Form to update the currently logged-in user's
      pay-rate (hourly wage).

◘ Custom Dependencies: ø 
◘ State: √ 
    ○ Global : √
    ○ Local  : √ 
• Theme: √
*********************************************************/

// React
import { useEffect, useState } from "react";

// Custom Hooks
import useUpdateUser from "../../hooks/useUpdateUser";

// Mui Components
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button";

// Icons & Styling
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { useTheme } from "@emotion/react";

const UpdateUserPayRateForm = () => {
    const theme = useTheme();

    // Global State
    const { isLoading, user, updateUserHourlyRate } = useUpdateUser();
    
    // Local State
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [dollars, setDollars] = useState('00');
    const [cents, setCents] = useState('00');
    const [hourly_rate, setHourlyRate] = useState(user.hourly_rate);

    // Local State-Errors
    const [usernameError, setUsernameError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);
    const [dollarsError, setDollarsError] = useState(null);
    const [centsError, setCentsError] = useState(null);
    const hourlyRateErrorArr = useState(null);
    const setHourlyRateError = hourlyRateErrorArr[1];

    const handleDollarsChange = async(e) => {
        if(e.target.value < 0 || e.target.value > 200){
            setDollarsError(true);
            return;
        } else {
            setDollarsError(false);
            setDollars(e.target.value);
        }
    }

    const handleCentsChange = async(e) => {
        if(e.target.value < 0 || e.target.value > 99){
            setCentsError(true);
            return;
        } else {
            setCentsError(false);
        }

        if(e.target.value < 10){
            setCents('0' + e.target.value);
        } else if(e.target.value >= 10){
            setCents(e.target.value);
        }
    }

    const updateHandler = async(e) => {
        setUsernameError(false);
        setPasswordError(false);
        setDollarsError(false);
        setCentsError(false);
        setHourlyRateError(false);

        if(username === ''){
            setUsernameError(true);
        }
        if(password === ''){
            setPasswordError(true);
        }
        if(dollars === ''){
            setDollarsError(true);
        }
        if(cents === ''){
            setCentsError(true);
        }
        if(hourly_rate === ''){
            setHourlyRateError(true);
        }

        e.preventDefault();
        await updateUserHourlyRate(username, password, hourly_rate, user.csrfToken);
        setUsername('');
        setPassword('');
    }

    useEffect(() => {
        const initHourlyRate = (str) => {
            let remove$ = str.split('$');
            let denominations = remove$[1].split('.');
            setDollars(denominations[0]);
            setCents(denominations[1]);
        }
        initHourlyRate(hourly_rate);
    }, []);

    useEffect(() => {
        setHourlyRate(`$${dollars}.${cents}`);
    }, [dollars, cents]);

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
            <Grid 
                container 
                alignItems="center"
                justifyContent="space-between"
            >
                <Grid item>
                    <Typography variant="h4">
                        Update Hourly Wage
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography variant="h5">
                        Currently: {hourly_rate}
                    </Typography>
                </Grid>
            </Grid>
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
            <Grid container alignItems="center" justifyContent="space-evenly">
                <Grid item>
                    <Typography variant="h4">
                        U.S.
                    </Typography>
                </Grid>
                <Grid item>
                    <AttachMoneyIcon
                        sx={{
                            backgroundColor: theme.palette.secondary.main,
                            borderRadius: '80px',
                            p: '10%'
                        }}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        type="number"
                        label="Dollars"
                        value={dollars}
                        onChange={handleDollarsChange}
                        required
                        variant="outlined"
                        error={dollarsError}
                        sx={{
                            mt: '1%',
                            mb: '1%'
                        }}
                    />
                </Grid>
                <Grid item>
                    <Typography variant="h4">.</Typography>
                </Grid>
                <Grid item>
                    <TextField
                        type="number"
                        label="Cents"
                        value={cents}
                        onChange={handleCentsChange}
                        required
                        variant="outlined"
                        error={centsError}
                        sx={{
                            mt: '1%',
                            mb: '1%'
                        }}
                    />
                </Grid>
            </Grid>
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

export default UpdateUserPayRateForm;
/*******************************************************
■ Filename: SignupForm.jsx
◘ Description:
    • React Component
    • Form used to create an account in the 
      OddJobber App.

◘ Custom Dependencies: √ 
◘ State: √ 
    ○ Global : √
    ○ Local  : √ 
• Theme: ø
*********************************************************/

// React
import { useState } from "react"

// Custom Hooks
import useSignup from '../../hooks/useSignup';

// Mui Components
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

// Custom Components
import CustomField from "../../components/general/CustomField";
import CollapseWithButton from "../general/CollapseWithButton";

// Images
import defaultUserImg from "../../images/people/defaultUser.png";
import man1 from "../../images/people/man1.png";
import man2 from "../../images/people/man2.png";
import man3 from "../../images/people/man3.png";
import woman1 from "../../images/people/woman1.png";
import woman2 from "../../images/people/woman2.png";
import woman3 from "../../images/people/woman3.png";

const SignupForm = () => {
        const [username, setUsername] = useState('');
        const [password, setPassword] = useState('');
        const [firstName, setFirstName] = useState('');
        const [lastName, setLastName] = useState('');
        const pictureArr = useState(defaultUserImg);
        const picture = pictureArr[0];
        const [email, setEmail] = useState('');
        const [cell, setCell] = useState('');
        const [street, setStreet] = useState('');
        const [city, setCity] = useState('');
        const [usState, setUsState] = useState('');
        const [zipcode, setZipcode] = useState('');
    
        // State-Errors
        const [usernameError, setUsernameError] = useState(null);
        const [passwordError, setPasswordError] = useState(null);
        const [firstNameError, setFirstNameError] = useState(null);
        const [lastNameError, setLastNameError] = useState(null);

        // picture error not req'd.
        const [emailError, setEmailError] = useState(null);
        const [cellError, setCellError] = useState(null);
        const [streetError, setStreetError] = useState(null);
        const [cityError, setCityError] = useState(null);
        const [usStateError, setUsStateError] = useState(null);
        const [zipcodeError, setZipcodeError] = useState(null);
    
        // Hooks
        const { signup, isLoading } = useSignup();
        
        const signupHandler = async(e) => {
            setUsernameError(false);
            setPasswordError(false);
            setFirstNameError(false);
            setLastNameError(false);
            // default picture always set for sign up
            setEmailError(false);
            setCellError(false);
            setStreetError(false);
            setCityError(false);
            setUsStateError(false);
            setZipcodeError(false);
    
            if(username === ''){
                setUsernameError(true);
            }
            if(password === ''){
                setPasswordError(true);
            }
            if(firstName === ''){
                setFirstNameError(true);
            }
            if(lastName === ''){
                setLastNameError(true);
            }
    
            if(email === ''){
                setEmailError(true);
            }
    
            e.preventDefault();
            await signup(
                username,
                password,
                firstName,
                lastName,
                picture,
                email,
                cell,
                street,
                city,
                usState,
                zipcode
            );
        }

    return(
        <Box
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={signupHandler}
        >
            <Typography
                variant="h4"
            >
                Sign up
            </Typography>
            <CustomField 
                type="text"
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                variant="outlined"
                error={usernameError}
                fullWidth
            />
            <CustomField 
                type="password"
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                variant="outlined"
                error={passwordError}
                fullWidth
            />
            <CustomField 
                type="text"
                label="First"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                variant="outlined"
                error={firstNameError}
                sx={{
                    width: '38%',
                    mr: '2%'
                }}
            />
            <CustomField 
                type="text"
                label="Last"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                variant="outlined"
                error={lastNameError}
                sx={{
                    width: '58%',
                    ml: '2%'
                }}
            />
            <CustomField 
                type="email"
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                variant="outlined"
                error={emailError}
                sx={{
                    width: '38%',
                    mr: '2%'
                }}
            />
            <CustomField 
                type="tel"
                label="Cell/Phone"
                value={cell}
                onChange={(e) => setCell(e.target.value)}
                variant="outlined"
                error={cellError}
                sx={{
                    width: '58%',
                    ml: '2%'
                }}
            />
            <CollapseWithButton buttonLabel="Address Info">
                <CustomField 
                    type="text"
                    label="Street"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    variant="outlined"
                    error={streetError}
                    fullWidth
                />
                <CustomField 
                    type="text"
                    label="City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    variant="outlined"
                    error={cityError}
                    fullWidth
                />
                <CustomField 
                    type="text"
                    label="US State"
                    value={usState}
                    onChange={(e) => setUsState(e.target.value)}
                    variant="outlined"
                    error={usStateError}
                    sx={{
                        width: '38%',
                        mr: '2%'
                    }}
                />
                <CustomField 
                    type="text"
                    label="US Zipcode"
                    value={zipcode}
                    onChange={(e) => setZipcode(e.target.value)}
                    variant="outlined"
                    error={zipcodeError}
                    sx={{
                        width: '58%',
                        ml: '2%'
                    }}
                />
            </CollapseWithButton>
            <Button 
                variant="contained"
                type="submit"
                disabled={isLoading}
                fullWidth
                sx={{
                    mt: '2vh',
                    mb: '2vh'
                }}
            >
                Sign up
            </Button>
        </Box>
    )
}

export default SignupForm;
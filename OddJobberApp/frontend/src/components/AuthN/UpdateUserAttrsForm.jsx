/*******************************************************
■ Filename: UpdateUserAttrsForm.jsx
◘ Description:
    • React Component
    • Form to update specific user attributes, including
      the user first & last names, email, cell phone #,
      and their address information. 

◘ Behavior:
   • The cell phone # and/or the address can be omitted,
     however, a complete address is required. Back-end
     validation ensures there is proper formatting of
     the US cell phone # format, US state abbreviations,
     and that a correct US zipcode are entered

◘ Custom Dependencies: √ 
◘ State: √ 
    ○ Global : √
    ○ Local  : √ 
• Theme: ø
*********************************************************/

// React
import { useState } from "react"

// Custom Hooks
import useUpdateUser from "../../hooks/useUpdateUser";

// Mui Components
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

// Custom Components
import CustomField from "../general/CustomField";
import CollapseWithButton from "../general/CollapseWithButton";

const UpdateUserAttrsForm = () => {
        const { isLoading, user, updateUserAttrs } = useUpdateUser();

        const idArr = useState(user._id);
        const id = idArr[0];
        const [firstName, setFirstName] = useState(user.firstName);
        const [lastName, setLastName] = useState(user.lastName);
        const pictureArr = useState(user.picture);
        const picture = pictureArr[0];
        const [email, setEmail] = useState(user.email);
        const [cell, setCell] = useState(user.cell);
        const [street, setStreet] = useState(user.street);
        const [city, setCity] = useState(user.city);
        const [usState, setUsState] = useState(user.state);
        const [zipcode, setZipcode] = useState(user.zipcode);
    
        // State-Errors
        const [firstNameError, setFirstNameError] = useState(null);
        const [lastNameError, setLastNameError] = useState(null);
        const pictureErrorArr = useState(null);
        const setPictureError = pictureErrorArr[1];
        const [emailError, setEmailError] = useState(null);
        const [cellError, setCellError] = useState(null);
        const [streetError, setStreetError] = useState(null);
        const [cityError, setCityError] = useState(null);
        const [usStateError, setUsStateError] = useState(null);
        const [zipcodeError, setZipcodeError] = useState(null);
        
        const updateHandler = async(e) => {
            setFirstNameError(false);
            setLastNameError(false);
            setPictureError(false);
            setEmailError(false);
            setCellError(false);
            setStreetError(false);
            setCityError(false);
            setUsStateError(false);
            setZipcodeError(false);
    
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
            await updateUserAttrs(
                id,
                firstName,
                lastName,
                picture,
                email,
                cell,
                street,
                city,
                usState,
                zipcode,
                user.csrfToken
            );
        }
    
    return(
        <Box
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={updateHandler}
        >
            <Typography
                variant="h4"
            >
                Account Information
            </Typography>
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
                Update Attributes
            </Button>
        </Box>
    )
}

export default UpdateUserAttrsForm;
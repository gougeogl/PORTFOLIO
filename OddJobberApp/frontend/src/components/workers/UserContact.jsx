/***********************************************************
■ Filename: UserContact.jsx
◘ Description:
    • React Component
    • Displays a worker's contact information if available.
    ◘ Options: [cell phone #, email address]

◘ Custom Dependencies: √ 
◘ State: ø 
    ○ Global : ø
    ○ Local  : √ 
• Theme: √
************************************************************/

// React
import { Fragment, useState } from "react";

// Mui Components
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import ButtonGroup from "@mui/material/ButtonGroup";
import IconButton from "@mui/material/IconButton";
import Popper from "@mui/material/Popper";

// Custom Components
import AddressTable from "./AddressTable";

// Icons & Styling
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import CommuteIcon from '@mui/icons-material/Commute';
import { useTheme } from "@emotion/react";

const UserContact = ({ user }) => {
    const [phonePopper, setPhonePopper] = useState(false);
    const [phoneAnchor, setPhoneAnchor] = useState(null);
    const [emailPopper, setEmailPopper] = useState(false);
    const [emailAnchor, setEmailAnchor] = useState(null);
    const [addressPopper, setAddressPopper] = useState(false);
    const [addressAnchor, setAddressAnchor] = useState(null);

    const togglePhonePopper = (e) => {
        setPhoneAnchor(e.currentTarget);
        setPhonePopper(!phonePopper);
    }

    const toggleEmailPopper = (e) => {
        setEmailAnchor(e.currentTarget);
        setEmailPopper(!emailPopper);
    }

    const toggleAddressPopper = (e) => {
        setAddressAnchor(e.currentTarget);
        setAddressPopper(!addressPopper);
    }

    return(
        <ButtonGroup>

            { (user && user.cell) ? (
                <Fragment>
                    <IconButton onClick={togglePhonePopper}>
                        <ContactPhoneIcon />
                    </IconButton>
                    <Popper 
                        anchorEl={phoneAnchor}
                        open={phonePopper} 
                        placement="bottom-end"
                    >
                        <PopperContent label="Cell:" value={user.cell} />
                    </Popper>
                </Fragment>
                ) : null
            }


            { (user && user.email) ? (
                <Fragment>
                    <IconButton onClick={toggleEmailPopper}>
                        <ContactMailIcon />
                    </IconButton>
                    <Popper 
                        anchorEl={emailAnchor}
                        open={emailPopper} 
                        placement="bottom-end"
                    >
                        <PopperContent label="Email:" value={user.email} />
                    </Popper>
                </Fragment>
                ) : null
            }

            { (user && ((user.street && user.city) && (user.state && user.zipcode))) ? (
                <Fragment>
                    <IconButton onClick={toggleAddressPopper}>
                        <CommuteIcon />
                    </IconButton>
                    <Popper 
                        anchorEl={addressAnchor}
                        open={addressPopper} 
                        placement="bottom-end"
                        sx={{
                            minWidth: '400px'
                        }}
                    >
                        <AddressTable 
                            street={user.street}
                            city={user.city}
                            state={user.state}
                            zipcode={user.zipcode}
                        />
                    </Popper>
                </Fragment>
                ) : null
            }
        </ButtonGroup>
    )
}

const PopperContent = ({ label, value }) => {
    const theme = useTheme();
    return(
        <Paper 
            elevation={3}
            sx={{
                backgroundColor: theme.palette.secondary.light,
                p: '5%',
                m: '2%',
            }}
        >
            <Grid container>
                <Grid item>
                    <Typography variant="6">
                        {label}
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography variant="subtitle1" noWrap>
                        {value}
                    </Typography>
                </Grid>
            </Grid>
        </Paper>
    )
}

export default UserContact;
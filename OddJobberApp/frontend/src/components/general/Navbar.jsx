/*********************************************************************
■ Filename: Navbar.jsx
◘ Description:
    • React Component
    • Custom Navigation bar components used in the OddJobber App

◘ Custom Dependencies: ø 
◘ State: √ 
    ○ Global : √ (Authentication, Page)
    ○ Local  : √ 
• Theme: √
**********************************************************************/

// React
import { Fragment, useState } from "react";

// 3rd Party 
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

// Custom Hooks
import useAuthenticationContext from '../../hooks/useAuthenticationContext';
import usePageContext from "../../hooks/usePageContext";
import useLogout from '../../hooks/useLogout';

// Mui Components
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import AppBar from '@mui/material/AppBar';
import Toolbar from "@mui/material/Toolbar";
import Grid from "@mui/material/Grid";
import Menu from "@mui/material/Menu";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import Rating from '@mui/material/Rating';
import Avatar from "@mui/material/Avatar";

// Icons & Styling
import PersonIcon from '@mui/icons-material/Person';
import HardwareIcon from '@mui/icons-material/Hardware';
import SettingsIcon from '@mui/icons-material/Settings';
import { useTheme } from "@emotion/react";

/*********************************************************
 ■ Navbar
 ◘ Description:
    A Mui Grid container for displaying the App Navigation
 ◘ Dependencies:
    ◘ Global state: User
      • useAuthenticationContext() hook
    ◘ Components
    - <LogoHomeLink />
    - <CurrentRating />
    - <Fullname />
    - <Username />
    - <AvatarMenu />
**********************************************************/
const Navbar = () => {
    return(
        <AppBar
            sx={{ 
                position: 'static'
            }}
        >
            <Toolbar disableGutters>
                <Grid container alignItems="center">
                    <Grid item xs={3} sm={4}>
                        <LogoHomeLink />
                    </Grid>
                    <Grid item xs={3} sm={3}>
                        <CurrentRating />
                    </Grid>
                    <Grid item xs={2} sm={3}>
                        <FullName />
                    </Grid>
                    <Grid item xs={2} sm={1}>
                        <Username />
                    </Grid>
                    <Grid item xs={2} sm={1}> 
                        <AvatarMenu />
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    );
}

/*********************************************************
 ■ LogoHomeLink
 ◘ Description:
    App Name & Logo. Used as a link to <HomePage />
 ○ Dependency of: <Navbar />
**********************************************************/
const LogoHomeLink = () => {
    const theme = useTheme();
    const { dispatch } = usePageContext();

    const handleNav = () => {
        dispatch({ type: 'CHANGE_TABS', tabIndex: 0 });
    }

    return(
        <Typography
            variant="h4"
            component={Link}
            to="/"
            onClick={handleNav}
            sx={{ 
                ml: '3vw',
                textDecoration: "none",
                color: theme.palette.primary.contrastText, 
                "&:hover": {
                    color: theme.palette.error.contrastText
                }
            }}
        >
            The Odd Jobber App
            <HardwareIcon 
                sx={{
                    ml: '3%',
                    mb: '0',
                    p: '1%',
                    borderRadius: '80%',
                    rotate: '45deg',
                    backgroundColor: theme.palette.secondary.dark,
                }}
            />
        </Typography>
    )
}

/*********************************************************
 ■ CurrentRating
 ◘ Description:
    Shows logged in user's current rating
 ○ Dependency of: <Navbar />
**********************************************************/
const CurrentRating = () => {
    const { user } = useAuthenticationContext();
    return(
        <>
        { user ? (
            <Fragment>
                <Typography
                    variant="subtitle2"
                >
                    Current Rating:
                </Typography>
                <Rating name="read-only" value={user.rating} max={10} readOnly /> 
            </Fragment>
            )
            : null 
        }
        </>
    )
}

/*********************************************************
 ■ CurrentRating
 ◘ Description:
    Shows logged in user's First & Last names
 ○ Dependency of: <Navbar />e
**********************************************************/
const FullName = () => {
    const { user } = useAuthenticationContext();

    return(
        <>
            { user ? (
                <Typography variant="h6">
                    {user.firstName} {user.lastName}
                </Typography>
                ) 
                : null 
            }
        </>
    )
}

/*********************************************************
 ■ CurrentRating
 ◘ Description:
    Shows username if logged in, 'Guest' otherwise
 ○ Dependency of: <Navbar />
**********************************************************/
const Username = () => {
    const { user } = useAuthenticationContext();

    return(
        <>{ user ? user.username : <>Guest</> }</>
    )
}

/*********************************************************
 ■ AvatarMenu
 ◘ Description:
    User avatar & Options Menu. 
    ◘ Avatar
        • Default is an anonymous icon.
        • If existing, will display the user's picture.

    ◘ Menu
      • logged in options <LoggedInMenuOptions /> (below)
      • logged out options <LoggedOutMenuOptions /> (below)
 ○ Dependency of: (parent) <Navbar />
**********************************************************/
const AvatarMenu = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const { user } = useAuthenticationContext();

    // Open menu
    const open = Boolean(anchorEl);

    // Close menu
    const handleClose = () => {
        setAnchorEl(null);
    }

    // sets the state variable used to
    // determine if menu is open / closed
    const handleClick = (e) => {
        setAnchorEl(e.currentTarget);
    }

    return(
        <>
            <Tooltip title="User Menu">
                <IconButton onClick={handleClick}>
                    { (user && user.picture) ? <Avatar src={user.picture}/> : <PersonIcon />}
                </IconButton>
            </Tooltip>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <LoggedInMenuOptions handleClose={handleClose}/>
                <LoggedOutMenuOptions handleClose={handleClose}/>
            </Menu>
        </>
    )
}

/*********************************************************
 ■ LoggedInMenuOptions
 ◘ Description:
    A <MenuList /> that will populate based upon the user's
    login status. 
    ◘ Options
      • link to <AccountPage />
      • Logout of App
 ○ Dependency of: (parent) <Navbar />
**********************************************************/
const LoggedInMenuOptions = ({ handleClose }) => {
    const theme = useTheme();
    const { user } = useAuthenticationContext();
    const logout = useLogout();

    const handleLogout = async(e) => {
        e.preventDefault();
        await logout();
    }

    return(
        <>
            { user &&
                (<MenuList>
                    <MenuItem key={uuidv4()}>
                        <Typography
                            variant="h6"
                            component={Link}
                            to="/account"
                            onClick={handleClose}
                            sx={{ 
                                textDecoration: "none",
                                color: theme.palette.error.dark,
                                mr: '2%' 
                            }}
                        >
                            Account
                        </Typography>
                        <SettingsIcon />
                    </MenuItem>
                    <MenuItem>
                        <Button 
                            variant="contained" 
                            onClick={ handleLogout }
                        >
                            Logout
                        </Button>
                    </MenuItem>
                </MenuList>)
            }
        </>
    )
}

/*********************************************************
 ■ LoggedOutMenuOptions
 ◘ Description:
    A <MenuList /> that will populate based upon the user's
    login status. 
    ◘ Options
      • login to App
      • signup
 ○ Dependency of: (parent) <Navbar />
**********************************************************/
const LoggedOutMenuOptions = ({ handleClose }) => {
    const { user } = useAuthenticationContext();

    return(
        <>
            { !user && 
                (<MenuList>
                        <MenuItem key={uuidv4()}>
                            <Typography
                                variant="h6"
                                component={Link}
                                to="/login"
                                onClick={handleClose}
                                sx={{ textDecoration: "none" }}
                            >
                                Login
                            </Typography>
                        </MenuItem>
                        <MenuItem
                            key={uuidv4()}
                        >
                            <Typography
                                variant="h6"
                                component={Link}
                                to="/signup"
                                onClick={handleClose}
                                sx={{ textDecoration: "none" }}
                            >
                                Sign up
                            </Typography>
                        </MenuItem>
                </MenuList>)
            }
        </>
    )
}

export default Navbar;
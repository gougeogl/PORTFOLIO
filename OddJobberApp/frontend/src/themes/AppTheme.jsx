/***********************************************
 ◘ filename: AppTheme.jsx 
 ◘ Description:
  Custom theme object used in the OddJobber App
  for styling Material UI (5) components 
 ***********************************************/

// Styling
import { createTheme } from '@mui/material';
import { 
  grey, 
  blueGrey, 
  lightBlue, 
  blue,
  amber,  
  brown, 
  deepOrange, 
  lime,
  green,
  lightGreen,
  deepPurple
} from '@mui/material/colors';

// MAIN THEME
const AppTheme = createTheme({
    palette: {
      primary: {
        main: green[800],
        light: lightGreen[500],
        dark: green[900],
        contrastText: amber[50]
      },
      secondary: {
        main: amber[500],
        light: brown[100], 
        dark: brown[800], 
        contrastText: blueGrey[500]
      },
      error: {
        main: deepOrange[600],
        light: deepOrange[300],
        dark: grey[900],
        contrastText: lightBlue[500]
      },
      background: {
        paper: amber[200],
        default: amber[50]
      },
      action: {
        active: brown[900],
        hover: lime['A400']
      },
      text: {
        primary: grey[900],
        secondary: deepPurple[900],
        disabled: blueGrey[500],
        divider: blue['A700']
      }
    }
});

export default AppTheme;
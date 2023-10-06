/***************************************************************
■ Filename: RemoveButton.jsx
◘ Description:
    • React Component
    • Styled button used to remove skills
      or workers from skill and worker tables

◘ Custom Dependencies: ø 
◘ State: √ 
    ○ Global : ø
    ○ Local  : ø 
• Theme: √
*****************************************************************/

// Mui Components
import Typography from "@mui/material/Typography";
import Button from '@mui/material/Button';

// Icons & Styling
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useTheme } from "@emotion/react";

const RemoveButton = ({ removeHandler }) => {
    const theme = useTheme();

    return(
        <Button 
            onClick={removeHandler}
            endIcon={
                <HighlightOffIcon color="error" />}
            sx={{
                backgroundColor: theme.palette.error.dark
            }}
        >
            <Typography 
                variant="body2"
                sx={{
                    color: theme.palette.primary.contrastText
                }}
            >
                Remove
            </Typography>
        </Button>
    )
}

export default RemoveButton;
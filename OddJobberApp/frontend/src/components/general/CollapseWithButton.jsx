/************************************************************************************
■ Filename: CollapseWithButton.jsx
◘ Description:
    • React Component
    • Children are wrapped in a Mui collapse that will expand/retract with the click
      of the included Mui button. The arrow rotates 180° depending on state of 
      the collapse (closed = arrow down).

◘ Custom Dependencies: ø 
◘ State: ø 
    ○ Global : ø
    ○ Local  : √ 
• Theme: √
*************************************************************************************/

// React
import { Fragment, useState } from "react";

// Mui Components
import Typography from "@mui/material/Typography";
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import Grid from '@mui/material/Grid';

// Icons & Styling
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import { styled } from "@mui/material";

const CollapseWithButton = ({ children, buttonLabel, buttonTheme, startIcon }) => {
    const [open, setOpen] = useState(false);
    return(
        <Fragment>
            <Button 
                variant='contained'
                fullWidth
                onClick={() => setOpen(!open)}
                endIcon={<RotatingArrow open={open}/>}
                sx={ buttonTheme && buttonTheme }
                startIcon={ startIcon && startIcon }
            >
                <Typography variant="subtitle2">
                    {buttonLabel}
                </Typography>
            </Button>
            <Collapse 
                in={open} 
                timeout="auto" 
                unmountOnExit
            >
                <Grid container direction="column">
                    <Grid item sx={{ m: '1%' }}>
                        {children}
                    </Grid>
                </Grid>
            </Collapse>
        </Fragment>
    )
}

const RotatingArrow = styled((open) => {
    return <ArrowCircleDownIcon {...open} />
})(({ theme, open }) => ({
    transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
}));

export default CollapseWithButton;
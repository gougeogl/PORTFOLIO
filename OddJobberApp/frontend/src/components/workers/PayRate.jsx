/***********************************************************
■ Filename: PayRate.jsx
◘ Description:
    • React Component
    • Displays a worker's pay rate (hourly wage).

◘ Custom Dependencies: ø 
◘ State: ø 
    ○ Global : ø
    ○ Local  : √ 
• Theme: √
************************************************************/

// React
import { useState } from "react";

// Mui Components
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Popper from "@mui/material/Popper";
import IconButton from "@mui/material/IconButton";
import ButtonGroup from "@mui/material/ButtonGroup";

// Icons & Styling
import PaidIcon from '@mui/icons-material/Paid';
import { useTheme } from "@emotion/react";

const RateContentPopper = ({ rate }) => {
    const theme = useTheme();

    return(
        <Paper 
            elevation={3}
            sx={{
                backgroundColor: theme.palette.primary.main,
                p: '5%',
                m: '2%',
            }}
        >
            <Grid container>
                <Grid item>
                    <Typography variant="6">
                        Hourly Rate:
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography variant="subtitle1" noWrap>
                        {rate}
                    </Typography>
                </Grid>
            </Grid>
        </Paper>
    )
}

const PayRate = ({ rate }) => {
    const [popper, setPopper] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    const togglePopper = (e) => {
        setAnchorEl(e.currentTarget);
        setPopper(!popper);
    }

    return(
        <ButtonGroup>
            <IconButton onClick={togglePopper}>
                <PaidIcon />
            </IconButton>
            <Popper 
                anchorEl={anchorEl}
                open={popper} 
                placement="bottom-end"
            >
                <RateContentPopper rate={rate} />
            </Popper>
        </ButtonGroup>
    )
}

export default PayRate;


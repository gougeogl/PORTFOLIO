/***********************************************************
■ Filename: SkillLevel.jsx
◘ Description:
    • React Component
    • Displays the level of a skill.
    ◘ Options: ['novice', 'intermediate', 'professional']

◘ Custom Dependencies: ø
◘ State: √ 
    ○ Global : ø
    ○ Local  : √ 
• Theme: ø
************************************************************/

// React
import { useEffect, useState } from 'react';

// Mui Components
import Typography from "@mui/material/Typography";
import Grid from '@mui/material/Grid';

// Icons & Styling
import ContentCutIcon from '@mui/icons-material/ContentCut';
import PlumbingIcon from '@mui/icons-material/Plumbing';
import EngineeringIcon from '@mui/icons-material/Engineering';
import { useTheme } from '@emotion/react';

const SkillLevel = ({ level }) => { 
    const theme = useTheme();
    const [icon, setIcon] = useState(null);

    useEffect(() => {
        const populateIcon = (status) => {
            switch(status){
                case 'novice':
                    return <ContentCutIcon sx={{ backgroundColor: theme.palette.secondary.light }}/>
                case 'intermediate':
                    return <PlumbingIcon sx={{ backgroundColor: theme.palette.primary.light }}/>
                case 'professional':
                    return <EngineeringIcon sx={{ backgroundColor: theme.palette.secondary.main }}/>
                default:
                    return <ContentCutIcon sx={{ backgroundColor: theme.palette.secondary.light }}/>
            }
        }
        setIcon(populateIcon(level));
    }, [level, theme]);

    return(
        <Grid 
            container
            alignItems="center"
            gap={1}
        >
            <Grid item>
                <Typography variant="h6">Level:</Typography>
            </Grid>
            <Grid item>
                {icon}
            </Grid>
            <Grid item>
                <Typography variant="body2">{level}</Typography>
            </Grid>
        </Grid>
    )
}

export default SkillLevel;
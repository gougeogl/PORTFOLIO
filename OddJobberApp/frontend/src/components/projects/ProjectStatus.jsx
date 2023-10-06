/***********************************************************
■ Filename: ProjectStatus.jsx
◘ Description:
    • React Component
    • Displays a particular project's status.
    ◘ Options: 'not started', 'in progress', 
               'behind schedule', 'complete'

◘ Custom Dependencies: ø 
◘ State: √ 
    ○ Global : ø
    ○ Local  : √ 
• Theme: √
************************************************************/

// React
import { useEffect, useState } from 'react';

// Mui Components
import Typography from "@mui/material/Typography";
import Grid from '@mui/material/Grid';

// Icons & Styling
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarIcon from '@mui/icons-material/Star';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import { useTheme } from '@emotion/react';

const ProjectStatus = ({ project }) => {
    const theme = useTheme();
    const [icon, setIcon] = useState(null);

    useEffect(() => {
        const populateIcon = (status) => {
            switch(status){
                case 'not started':
                    return <StarBorderIcon sx={{ backgroundColor: theme.palette.secondary.light }}/>
                case 'in progress':
                    return <StarHalfIcon sx={{ backgroundColor: theme.palette.secondary.main }}/>
                case 'behind schedule':
                    return <PendingActionsIcon sx={{ backgroundColor: theme.palette.error.main }}/>
                case 'complete':
                    return <>
                        <StarIcon 
                            sx={{ 
                                backgroundColor: theme.palette.primary.main 
                            }}
                        />
                        <AssignmentTurnedInIcon 
                            sx={{ 
                                backgroundColor: theme.palette.text.divider 
                            }}
                        />
                    </>
                default:
                    return <StarBorderIcon sx={{ backgroundColor: theme.palette.secondary.light }}/>
            }
        }

        setIcon(populateIcon(project.status));
    }, [project.status, theme]);

    return(
        <Grid 
            container
            alignItems="center"
            gap={1}
        >
            <Grid item>
                <Typography variant="h6">status:</Typography>
            </Grid>
            <Grid item>
                {icon}
            </Grid>
            <Grid item>
                <Typography variant="body2">{project.status}</Typography>
            </Grid>
        </Grid>
    )
}

export default ProjectStatus;
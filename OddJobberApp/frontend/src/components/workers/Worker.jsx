/***********************************************************
■ Filename: Worker.jsx
◘ Description:
    • React Component
    • Main Worker component for the OddJobber App.
      It is predominantly an Mui Card. A worker is
      a user.

◘ Custom Dependencies: √ 
◘ State: √ 
    ○ Global : √
    ○ Local  : √ 
• Theme: ø
************************************************************/

// React 
import { Fragment, useState, useEffect } from "react";

// Custom Hooks
import useAuthenticationContext from '../../hooks/useAuthenticationContext';
import useWorkers from "../../hooks/useWorkers";
import useProjects from "../../hooks/useProjects";

// Mui Components
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Collapse from '@mui/material/Collapse';
import Avatar from "@mui/material/Avatar";
import Rating from '@mui/material/Rating';
import UserContact from "./UserContact";
import IconButton from "@mui/material/IconButton";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from '@mui/material/CardMedia';
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";

// Custom Components
import PayRate from "./PayRate";
import SkillsTable from "../skills/SkillsTable";

// Icon Components
import ExpandIcon from '@mui/icons-material/Expand';

const Worker = ({ worker }) => {
    const [expanded, setExpanded] = useState(false);
    const { isLoading } = useWorkers();

    const toggleExpanded = (e) => {
        e.preventDefault();
        setExpanded(!expanded);
    }

    return(
        <Card key={worker._id} sx={{ mt: '1%', mb: '1%' }}>
            <Paper elevation={1}>
                <CardHeader
                    avatar={
                        <Avatar variant="rounded">
                            <CardMedia
                                component="img"
                                image={worker.picture}
                                sx={{ objectFit: 'contain' }}
                            />
                        </Avatar>
                    }
                    title={ worker.rating && <WorkerTitle worker={worker}/>}
                    action={
                        <Fragment>
                            { worker.hourly_rate && <PayRate rate={worker.hourly_rate} />}
                            <UserContact user={worker}/>
                        </Fragment>
                    }
                />
            </Paper>
            <CardContent>
                { (worker.skills && (worker.skills.length > 0)) ? (
                    <SkillsTable skills={worker.skills} type="worker"/>
                ) :
                    <Typography>No declared skills</Typography>
                }
            </CardContent>
            <CardActions sx={{ float: 'right' }}>
                <IconButton
                    type="submit"
                    onClick={toggleExpanded}
                    disabled={isLoading}
                >
                    <ExpandIcon />
                </IconButton>
            </CardActions>
            <Collapse 
                in={expanded} 
                timeout="auto" 
                unmountOnExit
            >
                <CardContent>
                    <Typography variant="h6">More information would go here.</Typography>
                </CardContent>
            </Collapse>
        </Card>
    );
}

const WorkerTitle = ({ worker }) => {
    // Global State
    const { user } = useAuthenticationContext();
    const { rateUser } = useWorkers();
    const { getProjects } = useProjects();

    // Local State
    const [isReadOnly, setIsReadOnly] = useState(false);
    const [rating, setRating] = useState(worker.rating);

    const handleChange = async(e, newValue) => {
        setRating(newValue);
        await rateUser(worker._id, newValue, user.csrfToken);
        await getProjects(user.csrfToken);
    }

    useEffect(() => {
        const isCurrentUser = (user_id, worker_id) => {
            return Boolean(user_id === worker_id);
        }
        setIsReadOnly(isCurrentUser(user._id, worker._id));
    }, [user._id, worker._id]);

    return(
        <Grid container columnSpacing={2}>
            <Grid item>
                <Typography variant="h6">
                    {worker.firstName} {worker.lastName}
                </Typography>
            </Grid>
            <Grid item>
                <Typography variant="subtitle2">
                    Current Rating:
                </Typography>
                <Rating 
                    name="rating" 
                    value={rating} 
                    max={10} 
                    onChange={handleChange}
                    readOnly={isReadOnly}
                /> 
            </Grid>
        </Grid>
    )
}

export default Worker;
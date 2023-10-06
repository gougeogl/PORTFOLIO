/***********************************************************
■ Filename: AddProjectWorkerForm.jsx
◘ Description:
    • React Component
    • Form used to add a worker (user) to one of the 
      currently logged-in user's projects according to 
      the global authentication, worker, and project states

◘ Custom Dependencies: √ 
◘ State: √ 
    ○ Global : √
    ○ Local  : √ 
• Theme: ø
************************************************************/

// React
import { useState } from 'react';

// Custom Hooks
import useAuthenticationContext from '../../hooks/useAuthenticationContext';
import useProjects from "../../hooks/useProjects";

// Mui Components
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

// Custom Components
import WorkerSearch from '../workers/WorkerSearch';

const AddProjectWorkerForm = ({ project_id }) => {
    const { user } = useAuthenticationContext();
    const [workerId, setWorkerId] = useState('');
    const { isLoading, addWorker } = useProjects();

    const formHandler = async(e) => {
        e.preventDefault();
        await addWorker(project_id, workerId, user.csrfToken);
        setWorkerId('');
    }

    return(
        <Box
            component="form"
            id="add-project-worker"
            noValidate
            autoComplete="off"
            onSubmit={formHandler}
            sx={{
                mt: '2%',
                mb: '2%'
            }}
        >
            <Typography
                variant="h4"
            >
                Add a worker
            </Typography>
            <WorkerSearch setId={setWorkerId} />
            <Button 
                type="submit"
                variant="contained"
                form="add-project-worker"
                value="submit"
                disabled={isLoading}
                fullWidth
                sx={{
                    mt: '1vh',
                    mb: '1vh'
                }}
            >
                <Typography variant="h6">
                    Add Worker
                </Typography>
            </Button>
        </Box>
    )
}

export default AddProjectWorkerForm;


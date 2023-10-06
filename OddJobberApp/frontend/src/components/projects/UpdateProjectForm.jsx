/**************************************************************
■ Filename: UpdateProjectForm.jsx
◘ Description:
    • React Component
    • Form to update specific project's attributes, including
      the description, deadline, and status

◘ Behavior:
   • Project deadlines are minimally allowed for the next day.
     Only the project contact (current user) can update a 
     project deadline. Invalid dates will disable the submit
     form's button

◘ Custom Dependencies: √ 
◘ State: √ 
    ○ Global : √
    ○ Local  : √ 
• Theme: ø
****************************************************************/

// React
import { useState, useMemo } from 'react';

// Custom Hooks
import useAuthenticationContext from '../../hooks/useAuthenticationContext';
import useProjects from "../../hooks/useProjects";

// Mui Components
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';

// Custom Components
import CustomField from "../general/CustomField";

// Time related
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import dayjs from 'dayjs';
const tomorrow = dayjs().add(1, 'day');

const UpdateProjectForm = ({ project }) => {
    const { user } = useAuthenticationContext();
    const projectIdArr = useState(project._id);
    const projectId = projectIdArr[0];
    const contactIdArr = useState(project.contact._id);
    const contactId = contactIdArr[0];
    const [description, setDescription] = useState(project.description);
    const [deadline, setDeadline] = useState(dayjs(project.deadline));
    const [status, setStatus] = useState(project.status);

    const projectIdErrorArr = useState(null);
    const setProjectIdError = projectIdErrorArr[1];
    const contactIdErrorArr = useState(null);
    const setContactIdError = contactIdErrorArr[1];
    const [descriptionError, setDescriptionError] = useState(null);
    const [deadlineError, setDeadlineError] = useState(null);
    const statusErrorArr = useState(null);
    const setStatusError = statusErrorArr[1];

    const { isLoading, updateProject } = useProjects();

    const isValidStatus = (status) => {
        const statii = ['not started', 'in progress', 'behind schedule', 'complete'];
        let result = false;
        for(let condition of statii){
            if(condition === status){
                result = true;
                break;
            }
        }
        return result;
    }

    let deadlineErrorHandler = useMemo(() => {
        switch(deadlineError){
            case 'maxDate':
            case 'minDate': {
                return 'You cannot pick a deadline earlier than your previous deadline';
            }

            case 'invalidDate': {
                return 'Invalid date';
            }

            default: {
                return '';
            }
        }
    }, [deadlineError]);

    const formHandler = async(e) => {
        setProjectIdError(false);
        setContactIdError(false);
        setDescriptionError(false);
        setStatusError(false);

        if(!projectId){
            setProjectIdError(true);
        }
        if(!contactId){
            setContactIdError(true);
        }
        if(description === ''){
            setDescriptionError(true);
        }
        if(!isValidStatus(status)){
            setStatusError(true);
        }

        e.preventDefault();
        await updateProject(projectId, contactId, description, deadline, status, user.csrfToken);

    }

    return(
        <Box
            component="form"
            id="update-project-attrs"
            noValidate
            autoComplete="off"
            onSubmit={formHandler}
        >
            <Typography
                variant="h4"
            >
                Project Form
            </Typography>
            <CustomField 
                type="text"
                label="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                fullWidth
                multiline
                rows={4}
                variant="outlined"
                error={descriptionError}
            />
            <DesktopDatePicker 
                label="Deadline"
                formatDensity='spacious'
                views={['day', 'month']}
                value={deadline}
                onChange={(newValue) => setDeadline(newValue)}
                defaultValue={tomorrow}
                onError={(newError) => setDeadlineError(newError)}
                slotProps={{
                    textField: {
                      helperText: deadlineErrorHandler,
                    },
                }}
                minDate={tomorrow}
                sx={{
                    width: '100%'
                }}
            />
            <FormControl
                fullWidth
                sx={{
                    mt: '2%',
                    mb: '3%',
                }}
            >
                <InputLabel>Status</InputLabel>
                <Select
                    value={status}
                    label="Status"
                    onChange={(e) => setStatus(e.target.value)}
                >
                    <MenuItem value="not started">not started</MenuItem>
                    <MenuItem value="in progress">in progress</MenuItem>
                    <MenuItem value="behind schedule">behind schedule</MenuItem>
                    <MenuItem value="complete">complete</MenuItem>
                </Select>
            </FormControl>
            <Button 
                type="submit"
                variant="contained"
                form="update-project-attrs"
                value="submit"
                disabled={isLoading || Boolean(deadlineError)}
                fullWidth
                sx={{
                    mt: '1vh',
                    mb: '1vh'
                }}
            >
                <Typography variant="h6">
                    Update Project
                </Typography>
            </Button>
        </Box>
    )
}

export default UpdateProjectForm;






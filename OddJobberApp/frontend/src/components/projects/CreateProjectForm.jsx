/***********************************************************
■ Filename: CreateProjectForm.jsx
◘ Description:
    • React Component
    • Form used by the currently logged-in user to create
      a new project. Skills and workers are not chosen upon
      initial creation. Separate actions are required to 
      update the project with those additions.

◘ Custom Dependencies: √ 
◘ State: √ 
    ○ Global : √
    ○ Local  : √ 
• Theme: ø
************************************************************/

// React
import { useState, useEffect, useMemo } from 'react';

// Custom Hooks
import useAuthenticationContext from '../../hooks/useAuthenticationContext';
import useProjects from "../../hooks/useProjects";

// Mui Components
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

// Custom Components
import CustomField from "../general/CustomField";

// 3rd part time related
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import dayjs from 'dayjs';
const tomorrow = dayjs().add(1, 'day');

const CreateProjectForm = () => {
    const { user } = useAuthenticationContext();

    const [contactId, setContactId] = useState('');
    const [description, setDescription] = useState('');
    const [deadline, setDeadline] = useState(tomorrow);

    const [contactIdError, setContactIdError] = useState(null);
    const [descriptionError, setDescriptionError] = useState(null);
    const [deadlineError, setDeadlineError] = useState(null);

    const { isLoading, createProject } = useProjects();

    const formHandler = async(e) => {
        setContactIdError(false);
        setDescriptionError(false);

        if(!contactId){
            setContactIdError(true);
        }
        if(!description){
            setDescriptionError(true);
        }

        e.preventDefault();
        await createProject(contactId, description, deadline, user.csrfToken);
        setDescription('');
    }

    let deadlineErrorHandler = useMemo(() => {
        switch(deadlineError){
            case 'maxDate':
            case 'minDate': {
                return 'You cannot pick a deadline earlier than tomorrow';
            }

            case 'invalidDate': {
                return 'Invalid date';
            }

            default: {
                return '';
            }
        }
    }, [deadlineError]);

    useEffect(() => {
        setContactId(user._id);
    }, [user]);

    return(
        <Box
            component="form"
            id="create-project"
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
                type="hidden"
                value={contactId}
                required
                error={contactIdError}
                sx={{
                    visibility: 'hidden'
                }}
            />
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
            <Button 
                type="submit"
                variant="contained"
                form="create-project"
                value="submit"
                disabled={(isLoading || Boolean(deadlineError))}
                fullWidth
                sx={{
                    mt: '1vh',
                    mb: '1vh'
                }}
            >
                <Typography variant="h6">
                    Create Project
                </Typography>
            </Button>
        </Box>
    )
}

export default CreateProjectForm;






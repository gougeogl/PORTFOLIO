/*******************************************************
■ Filename: AddProjectSkillForm.jsx
◘ Description:
    • React Component
    • Form used to add a skill to one of the currently
      logged-in user's projects according to the global
      authentication and project states

◘ Custom Dependencies: √ 
◘ State: √ 
    ○ Global : √
    ○ Local  : √ 
• Theme: ø
*********************************************************/

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
import SkillSearch from "../skills/SkillSearch";

const AddProjectSkillForm = ({ project_id }) => {
    const { user } = useAuthenticationContext();
    const [skillId, setSkillId] = useState('');
    const { isLoading, addProjectSkill } = useProjects();

    const formHandler = async(e) => {
        e.preventDefault();
        await addProjectSkill(project_id, skillId, user.csrfToken);
        setSkillId('');
    }

    return(
        <Box
            component="form"
            id="add-project-skill"
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
                Add a skill
            </Typography>
            <SkillSearch setId={setSkillId} />
            <Button 
                type="submit"
                variant="contained"
                form="add-project-skill"
                value="submit"
                disabled={isLoading}
                fullWidth
                sx={{
                    mt: '1vh',
                    mb: '1vh'
                }}
            >
                <Typography variant="h6">
                    Add Skill
                </Typography>
            </Button>
        </Box>
    )
}

export default AddProjectSkillForm;


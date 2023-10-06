/*******************************************************
■ Filename: AddUserSkillForm.jsx
◘ Description:
    • React Component
    • Form used to add a skill to the currently
      logged-in user according to the global
      authentication state

◘ Custom Dependencies: √ 
◘ State: ø 
    ○ Global : √
    ○ Local  : √ 
• Theme: ø
*********************************************************/

// React
import { useState } from 'react';

// Custom Hooks
import useUpdateUser from '../../hooks/useUpdateUser';

// Mui Components
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

// Custom Components
import SkillSearch from "../skills/SkillSearch";

const AddUserSkillForm = () => {
    // Global State
    const { isLoading, user, addUserSkill } = useUpdateUser();

    // Local State
    const [skillId, setSkillId] = useState('');
    
    const formHandler = async(e) => {
        e.preventDefault();
        await addUserSkill(user._id, skillId, user.csrfToken);
        setSkillId('');
    }

    return(
        <Box
            component="form"
            id="add-user-skill"
            noValidate
            autoComplete="off"
            onSubmit={formHandler}
            sx={{
                mt: '2%',
                mb: '2%',
                pl: '1%',
                pr: '1%'
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
                form="add-user-skill"
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

export default AddUserSkillForm;


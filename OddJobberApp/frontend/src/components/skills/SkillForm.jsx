/***********************************************************
■ Filename: SkillForm.jsx
◘ Description:
    • React Component
    • Form used by the currently logged-in user to create
      a new skill. A name and description are required.

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
import useSkills from '../../hooks/useSkills';

// Mui Components
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

// Custom Components
import CustomField from "../general/CustomField";

const SkillForm = () => {
    const { user } = useAuthenticationContext();
    const [name, setName] = useState('');
    const [level, setLevel] = useState('');
    const [description, setDescription] = useState('');
    const [nameError, setNameError] = useState(null);
    const [descriptionError, setDescriptionError] = useState(null);

    const { createSkill, isLoading } = useSkills();

    const formHandler = async(e) => {
        setNameError(false);
        setDescriptionError(false);

        if(name === ''){
            setNameError(true);
        }
        if(description === ''){
            setDescriptionError(true);
        }

        e.preventDefault();
        await createSkill(name, description, level, user.csrfToken);
        setName('');
        setDescription('');
        setLevel('');
    }

    return(
        <Box
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={formHandler}
        >
            <Typography
                variant="h4"
            >
                Skill Form
            </Typography>
            <CustomField 
                type="text"
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                fullWidth
                variant="outlined"
                error={nameError}
            />
            <CustomField 
                type="text"
                label="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                fullWidth
                multiline
                rows={3}
                variant="outlined"
                error={descriptionError}
            />
            <br />
            <FormControl
                fullWidth
                sx={{
                    mt: '2%',
                    mb: '3%',
                }}
            >
                <InputLabel>Level</InputLabel>
                <Select
                    value={level}
                    defaultValue="novice"
                    label="Level"
                    onChange={(e) => setLevel(e.target.value)}
                >
                    <MenuItem value="novice">novice</MenuItem>
                    <MenuItem value="intermediate">intermediate</MenuItem>
                    <MenuItem value="professional">professional</MenuItem>
                </Select>
            </FormControl>
            <Button 
                variant="contained"
                type="submit"
                disabled={isLoading}
                fullWidth
            >
                Create
            </Button>
        </Box>
    )
}

export default SkillForm;
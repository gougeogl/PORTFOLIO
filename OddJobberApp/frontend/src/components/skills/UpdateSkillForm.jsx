/**************************************************************
■ Filename: UpdateSkillForm.jsx
◘ Description:
    • React Component
    • Form to update a particular skill.

◘ Behavior:
   • Skills in user by other accounts (users) or as project
     requirements cannot be updated or deleted. Invalid 
     attempts to update will not trigger an error until the
     form is submitted.

◘ Custom Dependencies: √ 
◘ State: √ 
    ○ Global : √
    ○ Local  : √ 
• Theme: ø
****************************************************************/

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

const UpdateSkillForm = ({ skill }) => {
    const { user } = useAuthenticationContext();
    const skillIdArr = useState(skill._id);
    const skillId = skillIdArr[0];
    const [name, setName] = useState(skill.name);
    const [description, setDescription] = useState(skill.description);
    const pictureArr = useState(skill.picture);
    const picture = pictureArr[0];
    const [level, setLevel] = useState(skill.level);

    const skillIdErrorArr = useState(null);
    const setSkillIdError = skillIdErrorArr[1];
    const [nameError, setNameError] = useState(null);
    const [descriptionError, setDescriptionError] = useState(null);
    const pictureErrorArr = useState(null);
    const setPictureError = pictureErrorArr[1];
    const levelErrorArr = useState(null);
    const setLevelError = levelErrorArr[1];

    const { isLoading, updateSkill } = useSkills();

    const formHandler = async(e) => {
        setSkillIdError(null);
        setNameError(null);
        setDescriptionError(null);
        setPictureError(null);
        setLevelError(null);

        if(skillId === ''){
            setSkillIdError(true);
        }
        if(name === ''){
            setNameError(true);
        }
        if(description === ''){
            setDescriptionError(true);
        }
        // picture not required
        if(level === ''){
            setLevelError(true);
        }

        e.preventDefault();
        await updateSkill(skillId, name, description, picture, level, user.csrfToken);

    }

    return(
        <Box
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={formHandler}
        >
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
                    defaultValue={level}
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
                <Typography variant="h6">
                    Update
                </Typography>
            </Button>
        </Box>
    )
}

export default UpdateSkillForm;
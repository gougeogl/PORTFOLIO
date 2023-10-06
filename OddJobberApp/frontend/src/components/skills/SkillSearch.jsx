/***********************************************************
■ Filename: SkillSearch.jsx
◘ Description:
    • React Component
    • An autocomplete & form to search for any existing
      skills in the OddJobber App

◘ Custom Dependencies: √ 
◘ State: √ 
    ○ Global : √
    ○ Local  : √ 
• Theme: √
************************************************************/

// React
import { Fragment, useEffect, useState } from "react";

// Custom Hooks
import useSkills from "../../hooks/useSkills";

// Components
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';

// Custom Components
import Skill from "./Skill";

// Icons & Styling
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import { useTheme } from '@emotion/react';

const SkillSearch = ({ setId }) => {
    const theme = useTheme();
    const { skills, getSkills, getSkillByName } = useSkills();
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState([]);
    const [skill, setSkill] = useState(null);
    const loading = open && options.length === 0;

    const handleSearch = async(e, value) => {
        setSkill(null);
        let temp;
        if(value){
            temp = await getSkillByName(value.name);
            setSkill(temp);
            if(setId){
                setId(temp._id);
            } 
        }
    }

    const handleClose = () => {
        setOpen(false);
        setSkill(null);
        setOptions([]);
    }

    const createOptionLabels = async(skills) => {
        let arr = skills.map((skill) => ({
            id: skill._id,
            name: skill.name,
            level: skill.level
        }));
        setOptions([...arr]);
    }

    useEffect(() => {
        let active = true;

        if (!loading) {
            return undefined;
        }

        if (active) {
            (async() => {
                await createOptionLabels(skills);
            })();
        }

        return () => {
            active = false;
        };
    }, [loading, skills]);

    useEffect(() => {
        if (!open) {
            handleClose();
        }
    }, [open]);

    useEffect(() => {
        const initSkills = async() => {
            await getSkills();
        }
        initSkills();
    }, []);

    return (
        <Fragment>
            <Autocomplete
                sx={{
                    mt: '2vh',
                    mb: '2vh'
                 }}
                open={open}
                onOpen={() => {
                    setOpen(true);
                }}
                onClose={() => {
                    setOpen(false);
                }}
                onChange={handleSearch}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                getOptionLabel={(option) => `${option.name} (${option.level})`}
                options={options}
                loading={loading}
                loadingText="loading .."
                renderInput={(params) => (
                    <TextField 
                        {...params} 
                        label="Search skills.." 
                        InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                                <Fragment>
                                    {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                </Fragment>
                            )
                        }}
                        color="secondary"
                    />
                )}
            />
            {skill && <Skill skill={skill} />}
            {skill && (
                    <Button 
                        variant="contained"
                        fullWidth 
                        onClick={handleClose} 
                        startIcon={<ArrowCircleUpIcon />}
                        endIcon={<ArrowCircleUpIcon />}
                        sx={{
                            backgroundColor: theme.palette.primary.light,
                            color: theme.palette.text.secondary
                        }}
                    >
                        <Typography variant="subtitle1">
                            Close Skill Details
                        </Typography>
                    </Button>
                )
            }
        </Fragment>
    );
}

export default SkillSearch;
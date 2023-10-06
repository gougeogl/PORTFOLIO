/***********************************************************
■ Filename: ProjectSearch.jsx
◘ Description:
    • React Component
    • An autocomplete & form to search for any existing
      projects in the OddJobber App

◘ Custom Dependencies: √ 
◘ State: √ 
    ○ Global : √
    ○ Local  : √ 
• Theme: ø
************************************************************/

// React
import { Fragment, useEffect, useState } from "react";

// Custom Hooks
import useProjects from "../../hooks/useProjects";
import useAuthenticationContext from "../../hooks/useAuthenticationContext";

// Mui Components
import TextField from "@mui/material/TextField";
import Autocomplete from '@mui/material/Autocomplete';
import Button from "@mui/material/Button";
import CircularProgress from '@mui/material/CircularProgress';

// Custom Components
import Project from "./Project";

const ProjectSearch = ({ setId }) => {
    const { user } = useAuthenticationContext();
    const { projects, getProjectById } = useProjects();
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState([]);
    const [project, setProject] = useState(null);
    const loading = open && options.length === 0;

    const handleSearch = async(e, value) => {
        setProject(null);
        let temp;
        if(value){
            temp = await getProjectById(value.id, user.csrfToken);
            setProject(temp);
            if(setId){
                setId(temp._id);
            } 
        }
    }

    const handleClose = () => {
        setProject(null);
        setOptions([]);
        setOpen(false);
    }

    const createOptionLabels = async(projects) => {
        let arr = projects.map((project) => ({
            id: project._id,
            job_number: project.job_number.substring(1, 7),
            contact: `${project.contact.firstName.substring(0, 1)}. ${project.contact.lastName}`,
            description: project.description,
            deadline: project.deadline,
            status: project.status
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
                await createOptionLabels(projects);
            })();
        }

        return () => {
            active = false;
        };
    }, [loading, projects]);

    useEffect(() => {
        if (!open) {
            setOptions([]);
            setProject(null);
        }
    }, [open]);

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
                isOptionEqualToValue={(option, value) => option.id === value.id }
                getOptionLabel={(option) => `Contact: ${option.contact}. Job# ${option.job_number}...`}
                options={options}
                loading={loading}
                loadingText="loading .."
                renderInput={(params) => (
                    <TextField 
                        {...params} 
                        label="Search projects.." 
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
            {project && <Project project={project} />}
            {project && (
                    <Button 
                        variant="contained"
                        fullWidth 
                        onClick={handleClose} 
                    >
                        Close Project Details
                    </Button>
                )
            }
        </Fragment>
    );
}

export default ProjectSearch;
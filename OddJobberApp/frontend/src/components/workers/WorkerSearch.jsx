/***********************************************************
■ Filename: Workerearch.jsx
◘ Description:
    • React Component
    • Searches for workers (users) who are 
      NOT the currently logged-in user

◘ Custom Dependencies: √ 
◘ State: √ 
    ○ Global : √
    ○ Local  : √ 
• Theme: √
************************************************************/

// React
import { Fragment, useEffect, useState } from "react";

// Custom Hooks
import useAuthenticationContext from "../../hooks/useAuthenticationContext";
import useWorkers from "../../hooks/useWorkers";

// Mui Components
import TextField from "@mui/material/TextField";
import Autocomplete from '@mui/material/Autocomplete';
import Button from "@mui/material/Button";
import CircularProgress from '@mui/material/CircularProgress';

// Custom Components
import Worker from "./Worker";

// Icons & Styling
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import { useTheme } from "@emotion/react";

const WorkerSearch = ({ setId }) => {
    const theme = useTheme();
    const { user } = useAuthenticationContext();
    const { workers, getUsers, getUserById } = useWorkers();
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState([]);
    const [worker, setWorker] = useState(null);
    const loading = open && options.length === 0;

    const handleSearch = async(e, value) => {
        setWorker(null);
        let temp;
        if(value){
            temp = await getUserById(value.id);
            setWorker(temp);
            if(setId){
                setId(temp._id);
            } 
        }
    }

    const handleClose = () => {
        setWorker(null);
        setOptions([]);
        setOpen(false);
    }

    const createOptionLabels = async(workers) => {
        let arr = workers.map((user) => ({
            id: user._id,
            first: user.firstName,
            last: user.lastName,
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
                await createOptionLabels(workers);
            })();
        }

        return () => {
            active = false;
        };
    }, [loading, workers]);

    useEffect(() => {
        if (!open) {
            setOptions([]);
            setWorker(null);
        }
    }, [open]);

    useEffect(() => {
        const updateUsers = async() => {
            await getUsers(user.csrfToken);
        }
        if(open){
            updateUsers();
        }
    }, [worker]);

    useEffect(() => {
        const initWorkers = async() => {
            await getUsers();
        }
        initWorkers();
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
                getOptionLabel={(option) => `${option.first} ${option.last}`}
                options={options}
                loading={loading}
                loadingText="loading .."
                renderInput={(params) => (
                    <TextField 
                        {...params} 
                        label="Search workers.." 
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
            {worker && <Worker worker={worker} />}
            {worker && (
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
                        Close Worker Details
                    </Button>
                )
            }
        </Fragment>
    );
}

export default WorkerSearch;
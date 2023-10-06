/***********************************************************
■ Filename: ProjectContents.jsx
◘ Description:
    • React Component
    • Project contents as an Mui Stepper component
      wrapper, which is a type of list.

    ◘ Steps / Stepper sections:
      1. OVERVIEW: Project contact, description, deadline
         The current user IS the contact. Only the contact
         can update, or delete their own project(s).

      2. SKILLS: View current skills or add them as desired.
         Only the project contact can add or remove skills.
         Removed skills are NOT deleted from the system.

      3. WORKERS: Same as skills except for workers. If there
         are skills assigned, only workers (users) with those
         skills can be added.

◘ Custom Dependencies: √ 
◘ State: √ 
    ○ Global : √
    ○ Local  : √ 
• Theme: √
************************************************************/

// React
import { useState } from "react";

// Custom Hooks
import useAuthenticationContext from "../../hooks/useAuthenticationContext";

// Mui Components
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import CardMedia from '@mui/material/CardMedia';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';

// Custom Components
import SkillsTable from "../skills/SkillsTable";
import WorkersTable from "../workers/WorkersTable";
import AddProjectSkillForm from "./AddProjectSkillForm";
import AddProjectWorkerForm from "./AddProjectWorkerForm";

// Icons & Styling
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { useTheme } from "@emotion/react";

// 3rd party time related
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
dayjs.extend(localizedFormat);

const ProjectContents = ({ project }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [skipped, setSkipped] = useState(new Set());

    const isSkipped = (step) => {
        return skipped.has(step);
    }

    const hasSkills = (skills) => {
        if(skills.length > 0){
            return true;
        }
    }

    const hasWorkers = (workers) => {
        if(workers.length > 0){
            return true;
        }
    }

    const back = () => {
        let skippedUpdate = new Set(skipped.values());
        skippedUpdate.delete(currentStep);
        setSkipped(skippedUpdate);
        setCurrentStep((lastStep) => lastStep - 1);
    }

    const next = () => {
        if(isSkipped(currentStep)){
            let skippedUpdate = new Set(skipped.values());
            skippedUpdate.delete(currentStep);
            setSkipped(skippedUpdate);
        }
        setCurrentStep((lastStep) => lastStep + 1);
    }

    const reset = () => {
        setCurrentStep(0);
    }

    return(
        <Box>
            <Typography variant="h6" gutterBottom={true}>Sections</Typography>
            <Stepper orientation='vertical' activeStep={currentStep}>

                {/* STEP 1 : Overview */}
                <Step completed={true}>
                    <StepLabel>
                        <Typography>Overview</Typography>
                    </StepLabel>
                    <StepContent>
                        <OverviewContents project={project} next={next}/>
                    </StepContent>
                </Step>

                {/* STEP 2 : Skills */}
                <Step completed={hasSkills(project.skills)}>
                    <StepLabel>
                        <Typography>Requirements</Typography>
                    </StepLabel>
                    <StepContent>
                        <SkillsContent project={project} back={back} next={next} hasSkills={hasSkills} />
                    </StepContent>
                </Step>

                {/* STEP 3 : Workers */}
                <Step completed={hasWorkers(project.workers)}>
                    <StepLabel>
                        <Typography>Personnel</Typography>
                    </StepLabel>
                    <StepContent>
                        <WorkersContent project={project} back={back} next={next} hasWorkers={hasWorkers} />
                    </StepContent>
                </Step>
            </Stepper>
            {(currentStep === 3) && <Button variant="contained" onClick={reset}>Review</Button>}
        </Box>
    )
}

// Includes project description, contact, and deadline
const OverviewContents = ({ project, next }) => {
    return(
        <Paper elevation={2} sx={{ p: '1%'}}>
            <Grid container direction="row">
                <Grid 
                    container 
                    direction="row" 
                    columns={2}
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{ mt: '1%', mb: '1%' }}
                >
                    <Contact contact={project.contact} />
                    <ProjectDeadline deadline={project.deadline} />
                </Grid>
                <ProjectDescription description={project.description} />
            </Grid>
            <CustomStepButton label="Next" fn={next}/>
        </Paper>
    )
}

// Contact name and picture
const Contact = ({ contact }) => {
    const theme = useTheme();
    const { firstName, lastName, picture } = contact;
    return(
        <Grid 
            container 
            direction="row" 
            alignItems="center"
            justifyContent="space-around" 
            sx={{ 
                width: '40%',  
                pt: '1%',
                pb: '1%',
                backgroundColor: theme.palette.primary.light
            }}
        >
            <Grid item sx={{ pl: '2%' }}>
                <Typography variant="h6">Contact</Typography>
            </Grid>
            <Grid item sx={{ ml: '1%', mr: '1%' }}>
                <CardMedia
                    component="img"
                    image={picture}
                    sx={{ maxHeight: '8vh' }}
                />
            </Grid>
            <Grid item sx={{ pr: '2%' }}>
                <Typography variant="subtitle1">
                    {firstName} {lastName}
                </Typography>
            </Grid>
        </Grid>
    )
}

// Project completion deadline : Month Day, Year 
const ProjectDeadline = ({ deadline }) => {
    const theme = useTheme();
    const time = dayjs(deadline).format('LL');

    return(
        <Grid 
            container 
            direction="row" 
            alignItems="center" 
            justifyContent="flex-end" 
            sx={{ width: '40%' }}
        >
            <Grid item sx={{ pl: '2%' }}>
                <Typography sx={{ color: theme.palette.error.main }}>
                    Deadline:
                </Typography>
            </Grid>
            <Grid item sx={{ ml: '1%', mr: '1%' }}>
                <CalendarMonthIcon />
            </Grid>
            <Grid item sx={{ pr: '2%' }}>
                <Typography variant="subtitle1">{time}</Typography>
            </Grid>
        </Grid>
    )
}

const ProjectDescription = ({ description }) => {
    return(
        <Grid 
            container 
            direction="column" 
            sx={{ mt: '1%', mb: '1%' }}
        >
            <Grid item sx={{ p: '1%' }}>
                <Typography variant="h6">Description</Typography>
            </Grid>
            <Grid item sx={{ p: '1%' }}>
                <Typography variant="body1">{description}</Typography>
            </Grid>
        </Grid>
    )
}

// Existing project skills, and form to add a skill to the project
const SkillsContent = ({ project, back, next, hasSkills }) => {
    const { user } = useAuthenticationContext();

    return(
        <>
            { hasSkills(project.skills) && <SkillsTable skills={project.skills} type="project" project={project}/>}
            {(user._id === project.contact._id) && <AddProjectSkillForm project_id={project._id}/>}
            <Box sx={{ mt: '2%' }}>
                <CustomStepButton label="Back" fn={back}/>
                <CustomStepButton label="Next" fn={next}/>
            </Box>
        </>
    )
}

// Existing workers on the project and a form to add more workers
const WorkersContent = ({ project, back, next, hasWorkers }) => {
    const theme = useTheme();
    const { user } = useAuthenticationContext();
    return(
        <>
            { hasWorkers(project.workers) ? (
                <WorkersTable workers={project.workers} project={project}/>
                ) : ((user._id !== project.contact._id) ? (
                    <Typography variant="h6" sx={{ color: theme.palette.error.main }}>
                        Employment vacancy. See project contact for details.
                    </Typography>
                ) : null
            )}
            {(user._id === project.contact._id) && <AddProjectWorkerForm project_id={project._id}/>}
            <Box sx={{ mt: '2%' }}>
                <CustomStepButton label="Back" fn={back}/>
                <CustomStepButton label="Finish" fn={next}/>
            </Box>
        </>
    )
}

const CustomStepButton = ({ label, fn, form_id }) => {
    return(
        <Button 
            type="submit"
            variant="contained"
            form={form_id}
            value="submit"
            onClick={fn}
            sx={{ m: '1vh 1vw 1vh 1vw' }}
        >
            {label}
        </Button>
    )
}

export default ProjectContents;
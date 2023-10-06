/***********************************************************
■ Filename: Project.jsx
◘ Description:
    • React Component
    • Main Project component for the OddJobber App.
      It is predominantly an Mui Card.

◘ Custom Dependencies: √ 
◘ State: √ 
    ○ Global : √
    ○ Local  : ø 
• Theme: ø
************************************************************/

// Custom Hooks
import useAuthenticationContext from "../../hooks/useAuthenticationContext";
import useProjects from "../../hooks/useProjects";

// Mui Components
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";

// Custom Components
import ProjectStatus from "./ProjectStatus";
import ProjectContents from "./ProjectContents";
import ModalFormWrapper from "../general/ModalFormWrapper";
import UpdateProjectForm from "./UpdateProjectForm";
import DottedDivider from "../general/DottedDivider";

// Icon & Styling Components
import CarpenterIcon from '@mui/icons-material/Carpenter'; // Skills
import DeleteIcon from '@mui/icons-material/Delete';

const Project = ({ project }) => {
    const { user } = useAuthenticationContext();

    return(
        <Card sx={{ mt: '1%', mb: '1%' }}>
            <Paper elevation={1}>
                <CardHeader
                    avatar={<CarpenterIcon />}
                    title={<ProjectHeader project={project} />}
                    action={(user._id === project.contact._id) && (
                            <ModalFormWrapper >
                                <UpdateProjectForm project={project} />
                            </ModalFormWrapper>
                        )
                    }
                />
            </Paper>
            <CardContent>
                <ProjectContents project={project}/>
            </CardContent>
            {(user._id === project.contact._id) && <ProjectFooter project={project} />}
        </Card>
    );
}

const ProjectHeader = ({ project }) => {
    return(
        <Grid 
            container 
            columnSpacing={2}
            alignItems="center"
        >
            <Grid item>
                <Typography variant="h6">PROJECT</Typography>
            </Grid>
            <DottedDivider />
            <Grid item>
                <Typography variant="subtitle1">
                    <b>Job# </b> {project.job_number ? project.job_number : 'Not specified'}
                </Typography>
            </Grid>
            <DottedDivider />
            <Grid item>
                <ProjectStatus project={project} />
            </Grid>
        </Grid>
    )
}

const ProjectFooter = ({ project }) => {
    const { user } = useAuthenticationContext();
    const { isLoading, deleteProject } = useProjects();

    const handleDelete = async(e) => {
        e.preventDefault();
        await deleteProject(project._id, user.csrfToken);
    }

    return(
        <CardActions sx={{ float: 'right' }}>
            <IconButton
                type="submit"
                onClick={handleDelete}
                disabled={isLoading}
            >
                <DeleteIcon />
            </IconButton>
        </CardActions>
    )
}

export default Project;
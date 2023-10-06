/***********************************************************
■ Filename: Skill.jsx
◘ Description:
    • React Component
    • Main Skill component for the OddJobber App.
      It is predominantly an Mui Card.

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
import useSkills from "../../hooks/useSkills";

// Mui Components
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";

// Custom Components
import ModalFormWrapper from "../general/ModalFormWrapper";
import UpdateSkillForm from "./UpdateSkillForm";
import SkillLevel from "./SkillLevel";
import DottedDivider from "../general/DottedDivider";

// Icons & Styling
import IconButton from "@mui/material/IconButton";
import CarpenterIcon from '@mui/icons-material/Carpenter';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { useTheme } from "@emotion/react";

const Skill = ({ skill }) => {
    const theme = useTheme();
    const { user } = useAuthenticationContext();
    const { deleteSkill, isLoading } = useSkills();
    const [highlight, setHighlight] = useState(null);
    const [icon, setIcon] = useState(<CarpenterIcon />);

    const toggleSelected = () => {
        if(!highlight){
            setHighlight(theme.palette.secondary.light);
            setIcon(<CheckBoxIcon />);
        } else {
            setHighlight(null);
            setIcon(<CarpenterIcon />);
        }
    }

    const handleDelete = async(e) => {
        e.preventDefault();
        await deleteSkill(skill._id, user.csrfToken);
    }

    return(
        <Card
            key={skill._id}
            sx={{
                mt: '1%',
                mb: '1%',
            }}
        >
            <CardHeader
                avatar={
                    <Avatar 
                        variant="square"
                        sx={{
                            backgroundColor: highlight
                        }}
                    >
                        <IconButton
                            onClick={toggleSelected}
                        >
                            {icon}
                        </IconButton>
                    </Avatar>
                }
                title={<SkillHeader skill={skill}/>}
                action={
                    <ModalFormWrapper>
                        <UpdateSkillForm skill={skill} />
                    </ModalFormWrapper>
                }
            />
            <CardContent>
                <Typography
                    variant="h6"
                >
                    Description
                </Typography>
                <Typography>{skill.description}</Typography>
            </CardContent>
            <CardActions
                sx={{ 
                    float: 'right',
                }}
            >
                <IconButton
                    type="submit"
                    onClick={handleDelete}
                    disabled={isLoading}
                >
                    <DeleteIcon />
                </IconButton>
            </CardActions>
        </Card>
    );
}

const SkillHeader = ({ skill }) => {
    return(
        <Grid
            container
            columnSpacing={2}
            alignItems="center"
        >
            <Grid item>
                <Typography variant="h6">{skill.name}</Typography>
            </Grid>
            <DottedDivider />
            <Grid item>
                <SkillLevel level={skill.level} />
            </Grid>
        </Grid>
    )
}

export default Skill;
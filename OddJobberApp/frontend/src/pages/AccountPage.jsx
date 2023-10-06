/************************************************************************
 ◘ filename: AccountPage.jsx 
 ◘ Description:
    User account page for the OddJobber App. This page is the interface
    used when a user wants to update their security settings, account
    attributes e.g., their address, or delete their account.
 ************************************************************************/

// Custom Hooks
import useAuthenticationContext from "../hooks/useAuthenticationContext";

// Mui Components
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

// Custom Components
import AccountLayout from "../layouts/AccountLayout";
import ModalFormWrapper from "../components/general/ModalFormWrapper";
import CollapseWithButton from "../components/general/CollapseWithButton";
import SkillsTable from "../components/skills/SkillsTable";
import UpdateUserAttrsForm from "../components/AuthN/UpdateUserAttrsForm";
import AddUserSkillForm from "../components/AuthN/AddUserSkillForm";
import UpdateUserPasswordForm from "../components/AuthN/UpdateUserPasswordForm";
import UpdateUsernameForm from "../components/AuthN/UpdateUsernameForm";
import DeleteAccountForm from "../components/AuthN/DeleteAccountForm";
import UpdateUserPayRateForm from "../components/AuthN/UpdateUserPayRateForm";

// Styling & Icons
import KeyIcon from '@mui/icons-material/Key';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import CarpenterIcon from '@mui/icons-material/Carpenter';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useTheme } from "@emotion/react";

const AccountPage = () => {
    return(
        <AccountLayout>
            <Grid 
                container 
                direction="column" 
                spacing={2}
                sx={{ mt: '3vh', mb: '1vh' }}
            >
                <Grid item>
                    <UpdateCredentials />
                </Grid>
                <Grid item>
                    <UpdateAttributes />
                </Grid>
                <Grid item>
                    <UpdateWages />
                </Grid>
                <Grid item>
                    <UpdateSkills />
                </Grid>
                <Grid item>
                    <DeleteAccountWrapper />
                </Grid>
            </Grid>
        </AccountLayout>
    )
}

const UpdateCredentials = () => {
    return(
        <Grid 
            container 
            direction="column" 
            spacing={2}
        >
            <Grid item>
                <ModalFormWrapper buttonLabel="Username" icon={<HistoryEduIcon />}>
                    <UpdateUsernameForm />
                </ModalFormWrapper>
            </Grid>
            <Grid item>
                <ModalFormWrapper 
                    buttonLabel="Password" 
                    icon={<KeyIcon />}
                >
                    <UpdateUserPasswordForm />
                </ModalFormWrapper>
            </Grid>
        </Grid>
    )
}

const UpdateAttributes = () => {
    return(
        <Paper elevation={2}>
            <ModalFormWrapper buttonLabel="Primary Attributes" icon={<AssignmentIndIcon />}>
                <UpdateUserAttrsForm />
            </ModalFormWrapper>
        </Paper>
    )
}

const UpdateWages = () => {
    return(
        <ModalFormWrapper
            buttonLabel="Pay Rate"
            icon={<AttachMoneyIcon />}
        >
            <UpdateUserPayRateForm />
        </ModalFormWrapper>
    )
}

const UpdateSkills = () => {
    const theme = useTheme();
    const { user } = useAuthenticationContext();

    return(
        <Paper elevation={2}>
            <CollapseWithButton 
                buttonLabel="Skills"
                buttonTheme={{
                    backgroundColor: theme.palette.secondary.dark,
                    borderBottom: 5,
                    borderColor: theme.palette.primary.contrastText,
                    color: theme.palette.secondary.main,
                    "&:hover": {
                        backgroundColor: theme.palette.error.dark,
                        color: theme.palette.error.contrastText
                    } 
                }}
                startIcon={<CarpenterIcon />}
            >
                <Paper elevation={2}>
                    <Grid 
                        container 
                        direction="column"
                        spacing={2}
                        sx={{ mb: '2vh' }}
                    >
                        <Grid item>
                            { (user.skills.length > 0) && (
                                <ModalFormWrapper buttonLabel="Current Skills" icon={<CheckBoxOutlinedIcon />}>
                                    <SkillsTable skills={user.skills} type="user"/>
                                </ModalFormWrapper>
                            )}
                        </Grid>
                        <Grid item>
                            <AddUserSkillForm />
                        </Grid>
                    </Grid>
                </Paper>
            </CollapseWithButton>
        </Paper>
    )
}

const DeleteAccountWrapper = () => {
    const theme = useTheme();

    return(
        <ModalFormWrapper 
            buttonLabel="Delete Account" 
            icon={<DeleteForeverIcon sx={{ 
                    backgroundColor: theme.palette.error.main
                }}
            />}
        >
            <DeleteAccountForm />
        </ModalFormWrapper>
    )
}

export default AccountPage;
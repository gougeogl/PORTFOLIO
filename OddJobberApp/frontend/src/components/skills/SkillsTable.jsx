/****************************************************************
■ Filename: SkillsTable.jsx
◘ Description:
    • React Component
    • Displays skills as a table either for the 
      current user, or as part of a project.

◘ Custom Dependencies: √ 
◘ State: √ 
    ○ Global : √
    ○ Local  : ø 
• Theme: ø
************************************************************/

// React 
import React, { Fragment } from 'react';

// Custom Hooks
import useAuthenticationContext from '../../hooks/useAuthenticationContext';
import useUpdateUser from '../../hooks/useUpdateUser';
import useProjects from '../../hooks/useProjects';

// Mui Components
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

// Custom Components
import CollapseWithButton from '../general/CollapseWithButton';
import RemoveButton from '../general/RemoveButton';

// 3rd party (used for creating keys : GUID)
import { v4 as uuidv4 } from "uuid";

const SkillsTable = ({ skills, type, project }) => {
    return(
        <Fragment>
            <Typography variant="h6">Skills Summary</Typography>
            <TableContainer 
                component={Paper}
                elevation={3}
            >
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                Type
                            </TableCell>
                            <TableCell>
                                Level
                            </TableCell>
                            <TableCell align="right">
                                Details
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        { (skills && skills.length) ? (
                            skills.map(skill => (
                                <Fragment key={uuidv4()}>
                                    {(type === 'user') && <UserSkillRow skill={skill}/>}
                                    {(type === 'worker') && <WorkerSkillRow skill={skill}/>}
                                    {(type === 'project') && <ProjectSkillRow skill={skill} project={project}/>}
                                </Fragment>
                                ))
                            ) 
                            : null 
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </Fragment>
    )
}

const UserSkillRow = ({ skill }) => {
    const { user, removeUserSkill } = useUpdateUser();

    const removeUserSkillHandler = async() => {
        await removeUserSkill(user._id, skill._id, user.csrfToken);
    }

    return(
        <TableRow>
            <TableCell>
                {skill.name}
            </TableCell>
            <TableCell>
                {skill.level}
            </TableCell>
            <TableCell>
                <CollapseWithButton buttonLabel="Details">
                    {skill.description}
                </CollapseWithButton>
            </TableCell>
            <TableCell align='right'>
                <RemoveButton 
                    removeHandler={removeUserSkillHandler}
                />
            </TableCell>
        </TableRow>
    )
}

const WorkerSkillRow = ({ skill }) => {
    return(
        <TableRow>
            <TableCell>
                {skill.name}
            </TableCell>
            <TableCell>
                {skill.level}
            </TableCell>
            <TableCell>
                <CollapseWithButton buttonLabel="Details">
                    {skill.description}
                </CollapseWithButton>
            </TableCell>
        </TableRow>
    )
}

const ProjectSkillRow = ({ skill, project }) => {
    const { user } = useAuthenticationContext();
    const { removeProjectSkill } = useProjects();

    const handleRemoveProjectSkill = async() => {
        await removeProjectSkill(project._id, skill._id, user.csrfToken);
    }

    return(
        <TableRow>
            <TableCell>
                {skill.name}
            </TableCell>
            <TableCell>
                {skill.level}
            </TableCell>
            <TableCell>
                <CollapseWithButton buttonLabel="Details">
                    {skill.description}
                </CollapseWithButton>
            </TableCell>
            <TableCell align="right">
                {(user._id === project.contact._id) && <RemoveButton removeHandler={handleRemoveProjectSkill}/>}
            </TableCell>
        </TableRow>
    )
}

export default SkillsTable;



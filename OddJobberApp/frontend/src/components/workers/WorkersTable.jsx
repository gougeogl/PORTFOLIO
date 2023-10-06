/****************************************************************
■ Filename: WorkersTable.jsx
◘ Description:
    • React Component
    • Displays the workers (users) associated 
      with a particular project.

◘ Custom Dependencies: √ 
◘ State: √ 
    ○ Global : √
    ○ Local  : ø 
• Theme: ø
************************************************************/

// React 
import { Fragment } from 'react';

// Custom Hooks
import useAuthenticationContext from '../../hooks/useAuthenticationContext';
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
import Worker from "./Worker";
import RemoveButton from '../general/RemoveButton';
import CollapseWithButton from '../general/CollapseWithButton';

// 3rd party (used for keys: GUID)
import { v4 as uuidv4 } from 'uuid';

const WorkersTable = ({ workers, project }) => {
    return(
        <Fragment>
            <Typography variant="h6">Current Staffing</Typography>
            <TableContainer 
                component={Paper}
                elevation={3}
            >
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                Workers
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        { (workers && workers.length) ? (
                            workers.map(worker => <WorkerRow key={uuidv4()} worker={worker} project={project}/>
                            )) 
                            : null
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </Fragment>
    )
}

const WorkerRow = ({ worker, project }) => {
    const { user } = useAuthenticationContext();
    const { removeWorker } = useProjects();
    const label = `${worker.firstName} ${worker.lastName}`;

    const handleRemoveWorker = async() => {
        await removeWorker(project._id, worker._id, user.csrfToken);
    }

    return(
        <TableRow>
            <TableCell>
                <CollapseWithButton buttonLabel={label}>
                    <Worker worker={worker}/>
                </CollapseWithButton>
            </TableCell>
            <TableCell align='center'
                sx={{
                    width: '8%',
                    ml: 0,
                    pl: 0
                }}
            >
                {(user._id === project.contact._id) && <RemoveButton removeHandler={handleRemoveWorker}/>}
            </TableCell>
        </TableRow>
    )
}

export default WorkersTable;


/***********************************************************
■ Filename: AddressTable.jsx
◘ Description:
    • React Component
    • Displays a worker's address if it exists.

◘ Custom Dependencies: ø 
◘ State: ø 
    ○ Global : ø
    ○ Local  : ø 
• Theme: √
************************************************************/

// React
import { useTheme } from "@emotion/react";

// Mui Components
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const AddressTable = ({ street, city, state, zipcode }) => {
    const theme = useTheme();

    return(
        <Paper 
            elevation={3} 
            sx={{ 
                backgroundColor: theme.palette.secondary.light,
                p: '3%'
            }}
        >
            <Typography variant="h6">Address</Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                Street
                            </TableCell>
                            <TableCell>
                                City
                            </TableCell>
                            <TableCell>
                                State
                            </TableCell>
                            <TableCell>
                                Zipcode
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>{street}</TableCell>
                            <TableCell>{city}</TableCell>
                            <TableCell>{state}</TableCell>
                            <TableCell>{zipcode}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    )
}

export default AddressTable;
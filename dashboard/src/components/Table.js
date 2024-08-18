import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontSize: '0.8rem', // Reduced font size for better responsiveness
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    textAlign: 'left', // Left align for body cells
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


const rows = [];

rows.push( {
  device_id:'Siruvani Tank',model_name:"Bharat Pi ESP32 4G LTE",status:"ONLINE"
});

export default function CustomizedTables() {
  return (
    <Box sx={{ overflowX: 'auto' }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: { xs: 300, sm: 500, md: 700 } }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell sx={{ minWidth: 50 }}><Typography variant="h6" >S.No</Typography></StyledTableCell>
              <StyledTableCell sx={{ minWidth: 150 }} align="left"><Typography variant="h6" >Device ID</Typography></StyledTableCell>
              <StyledTableCell sx={{ minWidth: 100 }} align="left"><Typography variant="h6" >Model Name</Typography></StyledTableCell>
              <StyledTableCell sx={{ minWidth: 100 }} align="left"><Typography variant="h6" >Network Status</Typography></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <StyledTableRow key={row.device_id}>
                <StyledTableCell><Typography variant="subtitle1">{index + 1}</Typography></StyledTableCell>
                <StyledTableCell align="left"><Typography variant="subtitle1">{row.device_id}</Typography></StyledTableCell>
                <StyledTableCell align="left"><Typography variant="subtitle1">{row.model_name}</Typography></StyledTableCell>
                <StyledTableCell align="left"><Typography variant="subtitle1">{row.status}</Typography></StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}   

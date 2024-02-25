import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';
import { Fab } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import moment from 'moment';

export default function ContactTable({rows, setOpen, setContactId}) {
  const navigate = useNavigate();

  return (
    <TableContainer component={Paper}>
        <Fab color="primary" aria-label="add" size='small' style={{float:'right', marginRight:'10px'}} onClick={()=> setOpen(true)}>
            <AddIcon />
        </Fab>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell style={{fontWeight:'bolder'}}>First Name</TableCell>
            <TableCell align="center" style={{fontWeight:'bolder'}}>Phone No.</TableCell>
            <TableCell align="center" style={{fontWeight:'bolder'}}>Email</TableCell>
            <TableCell align="center" style={{fontWeight:'bolder'}}>Company Name</TableCell>
            <TableCell align="center" style={{fontWeight:'bolder'}}>Role</TableCell>
            <TableCell align="center" style={{fontWeight:'bolder'}}>Created At</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row"><a onClick={()=>navigate(`/user/contact/${row.id}`)} href='#'>{row.first_name} {row.last_name}</a></TableCell>
              <TableCell align="center">{row.phone_number}</TableCell>
              <TableCell align="center">{row.email}</TableCell>
              <TableCell align="center">{row.company_name}</TableCell>
              <TableCell align="center">{row.role}</TableCell>
              <TableCell align="center">{moment(row.createdAt).format('YYYY-MM-DD')}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
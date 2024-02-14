import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';

export default function AccountTable({rows}) {
    const navigate = useNavigate();
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell style={{fontWeight:'bolder'}}>Account Name</TableCell>
            <TableCell align="center" style={{fontWeight:'bolder'}}>Billing Address</TableCell>
            <TableCell align="center" style={{fontWeight:'bolder'}}>Shipping Address</TableCell>
            <TableCell align="center" style={{fontWeight:'bolder'}}>Total Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row"><a onClick={()=> navigate(`${row.id}`)} href='#'>{row.account_name}</a></TableCell>
              <TableCell align="center">{row.billing_address}</TableCell>
              <TableCell align="center">{row.shipping_address}</TableCell>
              <TableCell align="center">{row.total_amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
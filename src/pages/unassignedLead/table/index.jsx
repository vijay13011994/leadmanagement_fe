import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Chip, Fab } from '@mui/material';
import moment from 'moment';
import { updateUnassignedLeadService } from '../../../services/lead.service';

export default function GetUnassignedLeadTable({data, getUnassignedLeads}) {
 
  const selfAssignLead = async (id)=>{
    try{
        const {msg} = await updateUnassignedLeadService(id);
        getUnassignedLeads();
        alert(msg);
    }catch(e){
        alert(e);
    }
  } 

  return (  
    <>
    <br />
      {data.length !==0 && <TableContainer component={Paper}>
        <Table aria-label="simple table" >
          <TableHead>
            <TableRow>
              <TableCell style={{fontWeight:'bold', fontSize:'15px'}}>Name</TableCell>
              <TableCell style={{fontWeight:'bold', fontSize:'15px'}}>Company Name</TableCell>
              <TableCell style={{fontWeight:'bold', fontSize:'15px'}}>Contact No</TableCell>
              <TableCell style={{fontWeight:'bold', fontSize:'15px'}}>Status</TableCell>
              <TableCell style={{fontWeight:'bold', fontSize:'15px'}}>Created Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">{row.firstname+" "+row.lastname}</TableCell>
                <TableCell component="th" scope="row">{row.companyname}</TableCell>
                <TableCell component="th" scope="row">{row.mobileno}</TableCell>
                <TableCell component="th" scope="row">{row.status}</TableCell>
                <TableCell component='th'>{moment(row.createdAt).format("DD-MM-YYYY HH:MM")}</TableCell>
                <TableCell><Button variant='contained'size='xs' color='warning' onClick={()=>selfAssignLead(row.id)}>Self Assign</Button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>}
      {data.length ===0 && <center>No Data Found!</center>}
    </>
  );
}

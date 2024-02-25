import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Chip, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CreateTaskDialog from '../from/createTask';
import { createSearchParams, useNavigate } from 'react-router-dom';
import moment from 'moment';
import EditTaskDialog from '../from/editTask';

export default function AllTaskTable({isChild, data, leadid, getTasks, opportinityid, status}) {
  const [open, setOpen] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [task, setTask] = React.useState(false);
  const navigate = useNavigate();
  return (  
    <>
      <TableContainer component={Paper}>
        {(status!=='TYSCB' && status!=='CLOSELOST') && <Fab color="primary" aria-label="add" size='small' style={{float:'right', marginRight:'10px'}} onClick={()=> setOpen(true)}>
          <AddIcon />
        </Fab>}
        <Table aria-label="simple table" >
          <TableHead>
            <TableRow>
              <TableCell style={{fontWeight:'bold', fontSize:'15px'}}>Description</TableCell>
              <TableCell style={{fontWeight:'bold', fontSize:'15px'}}>Contact Person</TableCell>
              <TableCell style={{fontWeight:'bold', fontSize:'15px'}}>Contact Role</TableCell>
              <TableCell style={{fontWeight:'bold', fontSize:'15px'}}>Description</TableCell>
              <TableCell style={{fontWeight:'bold', fontSize:'15px'}}>Follow-up Date</TableCell>
              <TableCell style={{fontWeight:'bold', fontSize:'15px'}}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">{row.remark}</TableCell>
                <TableCell component="th" scope="row">{row.contactperson}</TableCell>
                <TableCell component="th" scope="row">{row.contactrole}</TableCell>
                <TableCell component="th" scope="row">{row.status}</TableCell>
                <TableCell component='th'>{moment(row.followupdate).format("DD-MM-YYYY HH:MM")}</TableCell>
                <TableCell><Button variant='contained'size='xs' color='warning' align="right" onClick={()=>{
                    setOpenEdit(true);
                    setTask(row);
                  }}>Edit</Button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <br />
      {isChild && 
        <center>
          <Chip label="see all >" size="small" variant="outlined"
            onClick={()=>navigate({pathname:'../task',
            search: createSearchParams({leadid}).toString()})}
          />
         </center>
      }
      <CreateTaskDialog open={open} setOpen={setOpen} leadid={leadid} getTasks={getTasks} opportinityid={opportinityid}/>
      <EditTaskDialog open={openEdit} setOpen={setOpenEdit} getTasks={getTasks} task={task}/>
    </>
  );
}

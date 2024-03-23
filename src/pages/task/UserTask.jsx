import React, { useEffect, useState } from 'react'
import AllTaskTable from './table'
import { deleteTaskService, getTaskService } from '../../services/task.service';
import { Button, Grid } from '@mui/material';

export default function Task(props) {
  const [data, setdata] = React.useState([]);
  const [interval, setInterval] = useState(1);
  const getTask = async ()=>{
    try{
      const {tasks} = await getTaskService({interval});
      setdata(tasks);
    }catch(e){
      alert(e);
    }
  }
  useEffect(()=>{
    getTask();
  }, [interval]);

  const deleteTask = async(id)=>{
    try{
      await deleteTaskService(id);
    }catch(e){
      alert(e);
    }
  }

  return (
    <>
      <center><h3 style={{textDecoration:'underline'}}>Task List</h3></center>
      <Grid container spacing={2}>
          <Grid item xl={3} sx={3}>
            <Button variant='contained' color='success'>1 Days</Button>
          </Grid>
          <Grid item xl={3} sx={3}>
            <Button variant='contained' color='success'>3 Days</Button>
          </Grid>
          <Grid item xl={3} sx={3}>
            <Button variant='contained' color='success'>7 Days</Button>
          </Grid>
      </Grid>
      <TableContainer component={Paper}>
        <Table aria-label="simple table" >
          <TableHead>
            <TableRow>
              <TableCell style={{fontWeight:'bold', fontSize:'15px'}}>Subject</TableCell>
              <TableCell style={{fontWeight:'bold', fontSize:'15px'}}>Description</TableCell>
              <TableCell style={{fontWeight:'bold', fontSize:'15px'}}>Contact Person</TableCell>
              <TableCell style={{fontWeight:'bold', fontSize:'15px'}}>Contact Role</TableCell>
              <TableCell style={{fontWeight:'bold', fontSize:'15px'}}>Status</TableCell>
              <TableCell style={{fontWeight:'bold', fontSize:'15px'}}>Follow-up Date</TableCell>
              <TableCell style={{fontWeight:'bold', fontSize:'15px'}}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow
                key={row.subject}
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
    </>
  )
}

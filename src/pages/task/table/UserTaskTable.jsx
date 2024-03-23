import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { Autocomplete, Button, Grid, TextField } from '@mui/material';
import { deleteTaskService, getTaskService } from '../../../services/task.service';
import EditTaskDialog from '../from/editTask';
import DeleteIcon from '@mui/icons-material/Delete';

export default function UserTaskTable() {
  const [rows, setRows] = React.useState([])
  const navigate = useNavigate();
  const [status, setStatus] = React.useState('OPEN');
  const [type, setType] = React.useState('MY TASK');
  const [toDate, setToDate] = React.useState(moment().format('YYYY-MM-DD'));
  const [openEdit, setOpenEdit] = React.useState(false);
  const [task, setTask] = React.useState(false);

  const getTasks = async ()=>{
    try{
      const {tasks} = await getTaskService({status, toDate, type});
      setRows(tasks);
    }catch(e){
      alert(e);
    }
  }

  const deleteTask = async(id)=>{
    try{
      const {msg} = await deleteTaskService(id);
      alert(msg);
      getTasks();
    }catch(e){
      alert(e);
    }
  }

  React.useEffect(()=>{
    getTasks();
  }, [status, type, toDate]);

  return (  
    <>
      <br />
      <Grid container spacing={2}>
      <Grid item xl={2} xs={12}>
          <Autocomplete
              size='small'
              id="combo-box-demo"
              value={type}
              options={[{label:'ALL'}, {label:'MY TASK'}]}
              onChange={(e, value)=> {
                setType(value.label);
              }}
              renderInput={(params) => <TextField  variant='outlined' name='status' {...params} label='Type'/>}
              required
          />
        </Grid>
        <Grid item xl={2} xs={12}>
          <Autocomplete
              size='small'
              id="combo-box-demo"
              value={status}
              options={[{label:'OPEN'}, {label:'INPROGRESS'}, {label:'COMPLETED'}]}
              onChange={(e, value)=> {
                setStatus(value.label);
              }}
              renderInput={(params) => <TextField  variant='outlined' name='status' {...params} label='Status'/>}
              required
          />
        </Grid>
        <Grid item xl={2} xs={12}>
          <TextField
                value={toDate}
                id="toDate"
                type="date"
                fullWidth
                variant="outlined"
                label={toDate!==""?"To Date":""}
                onChange={(e)=> setToDate(e.target.value)}
          />
        </Grid>
      </Grid>
      <br /><br />
      <TableContainer component={Paper}>
        <Table aria-label="simple table" >
          <TableHead>
            <TableRow>
              <TableCell style={{fontWeight:'bold', fontSize:'15px'}}>Subject</TableCell>
              <TableCell style={{fontWeight:'bold', fontSize:'15px'}}>Description</TableCell>
              <TableCell style={{fontWeight:'bold', fontSize:'15px'}}>Contact Person</TableCell>
              <TableCell style={{fontWeight:'bold', fontSize:'15px'}}>Contact Role</TableCell>
              <TableCell style={{fontWeight:'bold', fontSize:'15px'}}>Status</TableCell>
              <TableCell style={{fontWeight:'bold', fontSize:'15px'}}>Lead Name</TableCell>
              <TableCell style={{fontWeight:'bold', fontSize:'15px'}}>Opportinity Name</TableCell>
              <TableCell style={{fontWeight:'bold', fontSize:'15px'}}>Owner Name</TableCell>
              <TableCell style={{fontWeight:'bold', fontSize:'15px'}}>Follow-up Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <a style={{textDecoration:'underline', color:'blue'}} onClick={()=>{
                    setOpenEdit(true);
                    setTask(row);
                  }}>{row.subject}</a>
                </TableCell>
                <TableCell component="th" scope="row">{row.remark}</TableCell>
                <TableCell component="th" scope="row">{row.contactperson}</TableCell>
                <TableCell component="th" scope="row">{row.contactrole}</TableCell>
                <TableCell component="th" scope="row">{row.status}</TableCell>
                <TableCell component="th" scope="row"><a style={{textDecoration:'underline', color:'blue'}} onClick={()=>navigate(`/user/lead/${row.leadid}`)}>{row.leadname}</a></TableCell>
                <TableCell component="th" scope="row"><a style={{textDecoration:'underline', color:'blue'}} onClick={()=>navigate(`/user/opprourtinity/${opportinityid}`)}>{row.oppname}</a></TableCell>
                <TableCell component="th" scope="row">{row.ownername}</TableCell>
                <TableCell component='th'>{moment(row.followupdate).format("DD-MM-YYYY HH:MM")}</TableCell>
                <TableCell><DeleteIcon onClick={()=>deleteTask(row.id)}/></TableCell>
              </TableRow>
            ))} 
          </TableBody>
        </Table>
      </TableContainer>
      <EditTaskDialog open={openEdit} setOpen={setOpenEdit} getTasks={getTasks} task={task}/>
    </>
  );
}

import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import moment from 'moment';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from 'react-router-dom';
import { deleteLeadService } from '../../../services/lead.service';
import { Button, TextField } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
const isAdmin = sessionStorage.getItem('isAdmin');

const filter = {
  "name":"",
  "source":"",
  "companyname":"",
  "status":"",
  "createdAt":""
}

function Row(props) {
  const navigate = useNavigate();
  const { row } = props;
  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell component="th" scope="row">{row.name}</TableCell>
        <TableCell align="center">{row.source}</TableCell>
        <TableCell align="center">{row.companyname}</TableCell>
        <TableCell align="center">{row.billingaddress}</TableCell>
        <TableCell align="center">{row.renewal?"Y":"N"}</TableCell>
        <TableCell align="center">{row.status.toUpperCase()}</TableCell>
        <TableCell align="center">{row.createdAt}</TableCell>
        <TableCell align="center">{row.status === 'CONVERTED'?row.updatedAt:'--'}</TableCell>
        <TableCell><VisibilityIcon onClick={()=> navigate(`${row.id}`)}/></TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function CollapsibleTable(props) {
  const [ rows, setRows ] = React.useState([]);

  React.useEffect(()=>{
    setRows(props.rows)
  }, [props]);
  const onFilterChange = (e, field)=>{
    filter[field] = e.target.value;
    const filteredData = props.rows.filter(row=> {
      return (
          (row.name.toUpperCase()).includes(filter.name.toUpperCase()) &&
          (row.source.toUpperCase()).includes(filter.source.toUpperCase()) &&
          (row.companyname.toUpperCase()).includes(filter.companyname.toUpperCase()) &&
          (row.status.toUpperCase()).includes(filter.status.toUpperCase()) &&
          (row.createdAt).includes(filter.createdAt) 
          )
        }
      );
    setRows(filteredData);
  }

  const sortData = (order, value) => {
    const data = rows.sort((a,b)=>{
      if(a[value].toUpperCase() > b[value].toUpperCase()){
        return -order
      }
      if(a[value].toUpperCase() < b[value].toUpperCase()){
        return order
      }
      return 0;
    });
    setRows([...data])
  }

  const sortByDate = (val) => {
    let data;
    if(val == 1){
      data = rows.sort((a,b)=>moment(a.createdAt) - moment(b.createdAt));
    }
    if(val == -1){
      data = rows.sort((a,b)=>moment(b.createdAt) - moment(a.createdAt));
    }
    setRows([...data]);
  }

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell  style={{fontWeight:'bold', fontSize:'15px'}}>Name
              <ArrowDownwardIcon fontSize='xs' onClick={()=>sortData(-1, "name")}/>
              <ArrowUpwardIcon fontSize='xs' onClick={()=>sortData(1, "name")}/>
            </TableCell>
            <TableCell align="center"  style={{fontWeight:'bold', fontSize:'15px'}}>Source</TableCell>
            <TableCell align="center"  style={{fontWeight:'bold', fontSize:'15px'}}>Company Name</TableCell>
            <TableCell align="center" style={{fontWeight:'bold', fontSize:'15px'}}>Address</TableCell>
            <TableCell align="center" style={{fontWeight:'bold', fontSize:'15px'}}>Renewal</TableCell>
            <TableCell align="center" style={{fontWeight:'bold', fontSize:'15px'}}>Status
              <ArrowDownwardIcon fontSize='xs' onClick={()=>sortData(-1, "status")}/>
              <ArrowUpwardIcon fontSize='xs' onClick={()=>sortData(1, "status")}/>
            </TableCell>
            <TableCell align="center" style={{fontWeight:'bold', fontSize:'15px'}}>Created At
              <ArrowDownwardIcon fontSize='xs' onClick={()=>sortByDate(-1)}/>
              <ArrowUpwardIcon fontSize='xs' onClick={()=>sortByDate(1)}/>
            </TableCell>
            <TableCell align="center" style={{fontWeight:'bold', fontSize:'15px'}}>Converted At</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell><TextField size='small' onChange={(e)=>onFilterChange(e, "name")}/></TableCell>
            <TableCell><TextField size='small' onChange={(e)=>onFilterChange(e, "source")}/></TableCell>
            <TableCell><TextField size='small' onChange={(e)=>onFilterChange(e, "companyname")}/></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell><TextField size='small' onChange={(e)=>onFilterChange(e, "status")}/></TableCell>
            <TableCell><TextField size='small' onChange={(e)=>onFilterChange(e, "createdAt")}/></TableCell>
            <TableCell></TableCell>
          </TableRow>
          {rows.map((row) => (
            <Row key={row.name} row={row} setopen={props.setopen} setopentask={props.setopentask} setleadid={props.setleadid} getAllLeads={props.getAllLeads}/>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
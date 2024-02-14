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
const isAdmin = sessionStorage.getItem('isAdmin');

function Row(props) {
  const navigate = useNavigate();
  const { row } = props;
  React.useEffect(()=>{
    
  }, [props]);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell component="th" scope="row">{row.firstname+" "+ row.lastname}</TableCell>
        <TableCell align="center">{row.source}</TableCell>
        <TableCell align="center">{row.companyname}</TableCell>
        <TableCell align="center">{row.billingaddress}</TableCell>
        <TableCell align="center">{row.renewal?"Y":"N"}</TableCell>
        <TableCell align="center">{row.status.toUpperCase()}</TableCell>
        <TableCell align="center">{moment(row.createdAt).format('DD/MM/YYYY')}</TableCell>
        <TableCell align="center">{row.status === 'CONVERTED'?moment(row.updatedAt).format('DD/MM/YYYY'):'--'}</TableCell>
        <TableCell><VisibilityIcon onClick={()=> navigate(`${row.id}`)}/></TableCell>
      </TableRow>
    </React.Fragment>
  );
}



export default function CollapsibleTable(props) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell  style={{fontWeight:'bold', fontSize:'15px'}}>Name</TableCell>
            <TableCell align="center"  style={{fontWeight:'bold', fontSize:'15px'}}>Source</TableCell>
            <TableCell align="center"  style={{fontWeight:'bold', fontSize:'15px'}}>Company Name</TableCell>
            <TableCell align="center" style={{fontWeight:'bold', fontSize:'15px'}}>Address</TableCell>
            <TableCell align="center" style={{fontWeight:'bold', fontSize:'15px'}}>Renewal</TableCell>
            <TableCell align="center" style={{fontWeight:'bold', fontSize:'15px'}}>Status</TableCell>
            <TableCell align="center" style={{fontWeight:'bold', fontSize:'15px'}}>Created At</TableCell>
            <TableCell align="center" style={{fontWeight:'bold', fontSize:'15px'}}>Converted At</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.rows.map((row) => (
            <Row key={row.name} row={row}  setopen={props.setopen} setopentask={props.setopentask} setleadid={props.setleadid} getAllLeads={props.getAllLeads}/>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';

function Row(props) {
  const navigate = useNavigate();
  const { row } = props;
  React.useEffect(()=>{
    
  }, [props]);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell component="th" scope="row"><a href='#' onClick={()=> navigate(`/user/opprourtinity/${row.id}`)}>{row.name}</a></TableCell>
        <TableCell align="center">{row.status}</TableCell>
        <TableCell align="center">{row.description===''?"--":row.description}</TableCell>
      </TableRow>
    </React.Fragment>
  );
}



export default function OpprotinitiesCollapsibleTable(props) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell style={{fontWeight:'bold'}}>Name</TableCell>
            <TableCell align="center" style={{fontWeight:'bold'}}>Stage</TableCell>
            <TableCell align="center" style={{fontWeight:'bold'}}>Description</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {props.rows.map((row) => (
            <Row key={row.name} row={row}  setopen={props.setopen}  getOppo={props.getOpportunitiesByAccountId}/>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
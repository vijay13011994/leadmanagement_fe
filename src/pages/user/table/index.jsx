import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import moment from 'moment';
import { Button, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const filter = {
  "name":""
}
export default function UserTable(props) {
  const {deleteUser} = props;
  const [ rows, setRows ] = React.useState([]);

  React.useEffect(()=>{
    setRows(props.rows)
  }, [props]);
  
  const onFilterChange = (e, field)=>{
    filter[field] = e.target.value;
    const filteredData = props.rows.filter(row=> {
      return (
          (row.name.toUpperCase()).includes(filter.name.toUpperCase())
          )
        }
      );
    setRows(filteredData);
  }
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell style={{fontWeight:'bold'}}>Name</TableCell>
            <TableCell style={{fontWeight:'bold'}}>Contact</TableCell>
            <TableCell  style={{fontWeight:'bold'}}>Address</TableCell>
            <TableCell style={{fontWeight:'bold'}}>User Name</TableCell>
            <TableCell style={{fontWeight:'bold'}}>Password</TableCell>
            <TableCell style={{fontWeight:'bold'}}>Created At</TableCell>
            <TableCell style={{fontWeight:'bold'}}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            <TableRow>
              <TableCell><TextField size='small' onChange={(e)=>onFilterChange(e, "name")}/></TableCell>
              <TableCell/>
              <TableCell/>
              <TableCell/>
            </TableRow>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">{row.name}</TableCell>
              <TableCell>{row.contact}</TableCell>
              <TableCell>{row.address}</TableCell>
              <TableCell>{row.username}</TableCell>
              <TableCell>{row.password}</TableCell>
              <TableCell>{moment(row.createdAt).format('DD-MM-YYYY')}</TableCell>
              <TableCell><DeleteIcon fontSize='small' onClick={()=>deleteUser(row.id)}/></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
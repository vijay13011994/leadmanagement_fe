import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';
import { TextField } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

const filter = {
  "account_name":"",
  "total_amount":""
}

export default function AccountTable(props) {
  const [ rows, setRows ] = React.useState([]);
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
  React.useEffect(()=>{
    setRows(props.rows)
  }, [props]);
  
  const onFilterChange = (e, field)=>{
    filter[field] = e.target.value;
    const filteredData = props.rows.filter(row=> {
      return (
          (row.account_name.toUpperCase()).includes(filter.account_name.toUpperCase()) &&
          (row.total_amount).includes(filter.total_amount)
          )
        }
      );
    setRows(filteredData);
  }
  const navigate = useNavigate();
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell style={{fontWeight:'bolder'}}>Account Name
              <ArrowDownwardIcon fontSize='xs' onClick={()=>sortData(-1, "account_name")}/>
              <ArrowUpwardIcon fontSize='xs' onClick={()=>sortData(1, "account_name")}/>
            </TableCell>
            <TableCell align="center" style={{fontWeight:'bolder'}}>Billing Address</TableCell>
            <TableCell align="center" style={{fontWeight:'bolder'}}>Shipping Address</TableCell>
            <TableCell align="center" style={{fontWeight:'bolder'}}>Total Amount
              <ArrowDownwardIcon fontSize='xs' onClick={()=>sortData(-1, "total_amount")}/>
              <ArrowUpwardIcon fontSize='xs' onClick={()=>sortData(1, "total_amount")}/>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell><TextField size='small' onChange={(e)=>onFilterChange(e, "account_name")}/></TableCell>
            <TableCell/>
            <TableCell/>
            <TableCell><TextField size='small' onChange={(e)=>onFilterChange(e, "total_amount")}/></TableCell>
          </TableRow>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row"><a onClick={()=> navigate(`${row.id}`)} href='#'>{row.account_name}</a></TableCell>
              <TableCell align="center">{row.billing_address}</TableCell>
              <TableCell align="center">{row.shipping_address}</TableCell>
              <TableCell align="center">{row.total_amount?row.total_amount:0}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
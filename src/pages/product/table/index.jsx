import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Card, Container, TextField } from '@mui/material';
import { deleteProduct } from '../../../services/product';
import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

const filter = {
  "name":"",
  "mrp":"",
  "category":"",
  "sku":""
}
export default function ProductTable(props) {
  const {setOpen, setOpenEdit, setProduct} = props;
  const [ rows, setRows ] = React.useState([]);

  React.useEffect(()=>{
    setRows(props.rows)
  }, [props]);
  
  const onFilterChange = (e, field)=>{
    filter[field] = e.target.value;
    const filteredData = props.rows.filter(row=> {
      return (
          (row.name.toUpperCase()).includes(filter.name.toUpperCase()) &&
          (row.mrp).includes(filter.mrp) &&
          (row.category).includes(filter.category) &&
          (row.sku).includes(filter.sku)
          )
        }
      );
    setRows(filteredData);
  }

  const sortData = (order, value) => {
    const data = rows.sort((a,b)=>{
      if(a[value] > b[value]){
        return -order
      }
      if(a[value] < b[value]){
        return order
      }
      return 0;
    });
    setRows([...data])
  }

  return (
    <Container>
      <Card>
        <Fab color="primary" aria-label="add" size='small' style={{float:'right', margin:'10px'}} onClick={()=> setOpen(true)}>
            <AddIcon />
        </Fab>
        <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name
                <ArrowDownwardIcon fontSize='xs' onClick={()=>sortData(-1, "name")}/>
                <ArrowUpwardIcon fontSize='xs' onClick={()=>sortData(1, "name")}/>
              </TableCell>
              <TableCell>Price
                <ArrowDownwardIcon fontSize='xs' onClick={()=>sortData(-1, "mrp")}/>
                <ArrowUpwardIcon fontSize='xs' onClick={()=>sortData(1, "mrp")}/>
              </TableCell>
              <TableCell>Category</TableCell>
              <TableCell>SKU
                <ArrowDownwardIcon fontSize='xs' onClick={()=>sortData(-1, "sku")}/>
                <ArrowUpwardIcon fontSize='xs' onClick={()=>sortData(1, "sku")}/>
              </TableCell>
              <TableCell>Action</TableCell>
            </TableRow>

          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell><TextField size='small' onChange={(e)=>onFilterChange(e, "name")}/></TableCell>
              <TableCell><TextField size='small' onChange={(e)=>onFilterChange(e, "mrp")}/></TableCell>
              <TableCell><TextField size='small' onChange={(e)=>onFilterChange(e, "category")}/></TableCell>
              <TableCell><TextField size='small' onChange={(e)=>onFilterChange(e, "sku")}/></TableCell>
            </TableRow>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">{row.name}</TableCell>
                <TableCell>{row.mrp}</TableCell>
                <TableCell>{row.category}</TableCell>
                <TableCell>{row.sku}</TableCell>
                <TableCell><Button size='small' variant='contained' color='warning' onClick={()=>{
                  setProduct(row)
                  setOpenEdit(true)
                  }}>Edit</Button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        </TableContainer>
      </Card>
    </Container>
  );
}
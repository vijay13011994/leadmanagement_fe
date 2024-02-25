import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Card, Container } from '@mui/material';
import { deleteProduct } from '../../../services/product';
import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

export default function ProductTable({rows, setOpen, setOpenEdit, setProduct}) {
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
              <TableCell>Name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>SKU</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>

          </TableHead>
          <TableBody>
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
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Autocomplete, Box, Button, Fab, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { getProducts } from '../../../services/product';
import { deleteMappedProducts, mapProduct } from '../../../services/productmappping';
import DeleteIcon from '@mui/icons-material/Delete';

export default function InvoiceComponent({oppid, rows, getMappedProducts, status}) {
  const [products, setProducts] = React.useState([]);
  const [selectedProduct, setSelectedProduct] = React.useState(null);
  const [quantity, setQuantity] = React.useState(null);
  const [discount, setDiscount] = React.useState(null);

  function subtotal(items) {
    return items.map(({ mrp, quantity, discount }) => mrp* quantity-discount).reduce((sum, i) => sum + i, 0);
  }

  const addProduct = async()=>{
    try{
      if(!selectedProduct || !quantity){
        throw new Error('Field value are required');
      }
      const payload = {
        product_id: +selectedProduct.id,
        quantity: +quantity,
        opportinity_id: +oppid,
        mrp: selectedProduct.mrp,
        discount
      }
      const {msg} = await mapProduct(payload);
      getMappedProducts();
      setSelectedProduct(null);
      setQuantity(0);
      setDiscount(0);
    }catch(e){
      alert(e);
    }
  }
  
  React.useEffect(()=>{
    getProducts().then(({products, msg})=>setProducts(products));
  },[]);

  const onProductChange = (e, value)=>{
    if(value){
      setSelectedProduct(value);
    }
  }

  const deleteItem = async(id)=>{
    try{
      await deleteMappedProducts(id);
      getMappedProducts();
    }catch(e){
      alert(e);
    }
  }

  return (
    <TableContainer component={Paper}>
      <Table aria-label="spanning table">
        <TableHead>
          {status!=='CLOSEDWON' && <TableRow>
          <TableCell width={'250px'}>
            <Autocomplete
                size='small'
                id="combo-box-demo"
                options={products}
                getOptionLabel={(option) => `${option.name}`}
                onChange={onProductChange}
                renderInput={(params) => <TextField  variant='outlined' name='leadid' {...params} label='Product' />}
            />
        </TableCell>
        <TableCell align="center" width={'250px'}>
            <TextField
              size='small'
              autoFocus
              margin="dense"
              id="quantity"
              label="quantity"
              type="number"
              value={quantity}
              onChange={(e)=>setQuantity(e.target.value)}
              variant="outlined"
            />
        </TableCell>
        <TableCell align="center" width={'250px'}>
            <TextField
              size='small'
              autoFocus
              margin="dense"
              id="discount"
              label="discount"
              type="number"
              value={discount}
              onChange={(e)=>setDiscount(e.target.value)}
              variant="outlined"
            />
        </TableCell>
        <TableCell align='right'>
          <Fab color="primary" aria-label="add" size='small' style={{ float: 'right', marginRight: '10px' }} onClick={addProduct}>
              <AddIcon />
          </Fab>
        </TableCell>
          </TableRow>}
          <TableRow>
            <TableCell>Desc</TableCell>
            <TableCell align="center">SKU</TableCell>
            <TableCell align="center">Qty.</TableCell>
            <TableCell align="center">Unit Price</TableCell>
            <TableCell align="center">Discount</TableCell>
            <TableCell align="center">Sum</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.productname}>
              <TableCell>{row.productname}</TableCell>
              <TableCell align="center">{row.sku}</TableCell>
              <TableCell align="center">{row.quantity}</TableCell>
              <TableCell align="center">{row.mrp}</TableCell>
              <TableCell align="center">{row.discount}</TableCell>
              <TableCell align="center">{row.quantity*row.mrp-row.discount}</TableCell>
              {status!=='CLOSEDWON' && <TableCell align="center"><DeleteIcon fontSize='small' onClick={()=>deleteItem(row.id)}/></TableCell>}
            </TableRow>
          ))}
          <TableRow>
            <TableCell rowSpan={3} />
            <TableCell colSpan={2}>Total</TableCell>
            <TableCell align="right">{subtotal(rows)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
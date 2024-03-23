import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { createProduct, getProductByIdService } from '../../../services/product';

export default function EditProduct({open, setOpen, getAllProducts, product}) {
  const handleClose = () => {
    setOpen(false);
  };

  const submitForm = async(e) =>{
    try{
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const formJson = Object.fromEntries(formData.entries());
        formJson.id = product.id;
        const {msg} = await createProduct(formJson);
        alert("Product updated successfully!");
        getAllProducts();
        handleClose();
    }catch(e){
        alert(e.message);
    }
  }

  return (
    <React.Fragment>
      {product && <Dialog open={open} onClose={handleClose} fullWidth='xs' maxWidth='xs'>
        <form onSubmit={submitForm}>
          <DialogTitle style={{textDecoration:'underline', fontWeight:'bold'}}>Product</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              name='name'
              label="Product Name"
              type="text"
              fullWidth
              variant="standard"
              defaultValue={product.name}
              required
            />
            <br />
            <TextField
              autoFocus
              margin="dense"
              id="mrp"
              name='mrp'
              label="MRP (in Rs.)"
              type="number"
              fullWidth
              variant="standard"
              defaultValue={product.mrp}
              required
            />
            <br />
            <TextField
              autoFocus
              margin="dense"
              id="sku"
              name='sku'
              label="SKU"
              fullWidth
              variant="standard"
              defaultValue={product.sku}
              required
            />
            <br />
            <TextField
              autoFocus
              margin="dense"
              id="category"
              name='category'
              label="Category"
              fullWidth
              variant="standard"
              defaultValue={product.category}
              required
            />
          </DialogContent>
          <DialogActions>
            <Button variant='contained' color='error' onClick={handleClose}>Cancel</Button>
            <Button type='submit' variant='contained' color='success' onClick={handleClose}>Submit</Button>
          </DialogActions>
        </form>
      </Dialog>}
    </React.Fragment>
  );
}
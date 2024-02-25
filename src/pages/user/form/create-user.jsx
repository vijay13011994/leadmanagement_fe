import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { createUser } from '../../../services/user.service';

export default function CreateUser({open, setOpen, getUsers}) {
  const handleClose = () => {
    setOpen(false);
  };

  const submitForm = async(e) =>{
    try{
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const formJson = Object.fromEntries(formData.entries());
        const {msg} = await createUser(formJson);
        alert(msg);
        getUsers();
        handleClose();
    }catch(e){
        alert(e);
    }
  }

  return (
    <React.Fragment>
        <Dialog open={open} onClose={handleClose} fullWidth='xs'
            maxWidth='xs'>
      <form autoComplete='off' onSubmit={submitForm}>
            
            <DialogTitle style={{textDecoration:'underline', fontWeight:'bold'}}>Create User</DialogTitle>
            <DialogContent>
            <TextField
                autoFocus
                name='name'
                margin="dense"
                id="name"
                label="Name"
                type="text"
                fullWidth
                variant="standard"
            />
            <br />
            <TextField
                name="contact"
                margin="dense"
                id="contact"
                label="Contact"
                type="text"
                fullWidth
                variant="standard"
            />
            <br />
            <TextField
                name="address"
                margin="dense"
                id="address"
                label="Address"
                type="textarea"
                fullWidth
                variant="standard"
            />
            <br />
            </DialogContent>
            <DialogActions>
            <Button variant='contained' color='error' onClick={handleClose}>Cancel</Button>
            <Button type='submit' variant='contained' color='success'>Submit</Button>
            </DialogActions>
      </form>

        </Dialog>
    </React.Fragment>
  );
}
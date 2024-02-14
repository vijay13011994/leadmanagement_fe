import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { changePassword } from '../../services/user.service';

export default function ChangePasswordForm({open, setOpen}) {
  const handleClose = () => {
    setOpen(false);
  };

  const submitForm = async(e) =>{
    try{
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const formJson = Object.fromEntries(formData.entries());
        const {msg} = await changePassword(formJson);
        handleClose();
        alert(msg);
    }catch(e){
        alert(e.message);
        console.log(e);
    }
  }

  return (
    <React.Fragment>
      <Dialog open={open} onClose={handleClose} fullWidth='xs' maxWidth='xs'>
        <form onSubmit={submitForm}>
          <DialogTitle style={{textDecoration:'underline', fontWeight:'bold'}}>Change Password</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="old_password"
              name='old_password'
              label="Old Password"
              type="text"
              fullWidth
              variant="standard"
            />
            <br />
            <TextField
              autoFocus
              margin="dense"
              id="new_password"
              name='new_password'
              label="New Password"
              type="text"
              fullWidth
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button variant='contained' color='error' onClick={handleClose}>Cancel</Button>
            <Button type='submit' variant='contained' color='success' onClick={handleClose}>Submit</Button>
          </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  );
}
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { createTask } from '../../../services/task.service';

export default function CreateTask(props) {
  const handleClose = () => {
    props.setopentask(false);
  };

  const submitForm = async(e) =>{
    try{
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const formJson = Object.fromEntries(formData.entries());
      formJson.leadid = props.leadid;
      const {msg} = await createTask(formJson);
      alert(msg);
      handleClose();
      window.location.reload();
    }catch(e){
      alert(e);
    }
  }

  return (
    <React.Fragment>
      <Dialog open={props.open} onClose={handleClose}
        fullWidth='sm'
        maxWidth='sm'
      >
        <DialogTitle>Create Task</DialogTitle>
        <form onSubmit={submitForm}>
          <DialogContent>
            <br/>
            <TextField
              id="outlined-multiline-static"
              label="Remarks"
              name='remark'
              multiline
              rows={2}
            />
            <br/>
            <br/>
            <label style={{textDecoration:'underline'}}>Follow-up Date</label>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              name='followupdate'
              type="date"
              fullWidth
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} variant='contained' color='warning'>Cancel</Button>
            <Button type='submit' variant='contained' color='success'>Submit</Button>
          </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  );
}
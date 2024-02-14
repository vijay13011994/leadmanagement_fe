import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { createTask } from '../../../services/task.service';
import { Autocomplete } from '@mui/material';

export default function CreateTaskDialog({open, setOpen, leadid, getTasks, opportinityid}) {

  const handleClose = () => {
    setOpen(false);
  };


  const submitForm = async(e) =>{
    try{
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const formJson = Object.fromEntries(formData.entries());
        formJson.leadid = leadid?leadid:null;
        formJson.opportinityid = opportinityid?opportinityid:null;
        const {msg} = await createTask(formJson);
        getTasks();
        handleClose();
    }catch(e){
        alert(e);
    }
  }


  return (
    <React.Fragment>
      <Dialog open={open} onClose={handleClose} fullWidth='xs' maxWidth='xs'>
        <form onSubmit={submitForm}>
          <DialogTitle style={{textDecoration:'underline', fontWeight:'bold'}}>Create Task</DialogTitle>
          <DialogContent>
            <DialogContentText></DialogContentText>
              <br />
              <TextField
                id="standard-multiline-static"
                name='remark'
                label="Remarks"
                multiline
                rows={3}
                fullWidth
                variant="standard"
                required
              />
              <br /><br />
              <TextField
                id="standard-multiline-static"
                name='contactperson'
                label="Contact Person"
                fullWidth
                variant="standard"
                required
              />
              <br /><br />
              <Autocomplete
                size='small'
                id="combo-box-demo"
                options={[{label:'OPEN'}, {label:'INPROGRESS'}, {label:'COMPLETED'}]}
                defaultValue={'OPEN'}
                renderInput={(params) => <TextField  variant='standard' name='status' {...params} label='Status' />}
              />
              <br /><br />
              <span>Follow-up Date</span>
              <TextField
                  margin="dense"
                  name='followupdate'
                  id="followupdate"
                  label=""
                  type="date"
                  fullWidth
                  variant="standard"
                  required
              />
          </DialogContent>
          <DialogActions>
            <Button variant='contained' color='warning' onClick={handleClose}>Cancel</Button>
            <Button type='submit' variant='contained' color='success'>Submit</Button>
          </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  );
}
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
import moment from 'moment';

export default function EditTaskDialog({open, setOpen, getTasks, task}) {

  const handleClose = () => {
    setOpen(false);
  };

  const submitForm = async(e) =>{
    try{
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const formJson = Object.fromEntries(formData.entries());
        formJson.id = task.id;
        const {msg} = await createTask(formJson);
        alert(msg);
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
          <DialogTitle style={{textDecoration:'underline', fontWeight:'bold'}}>Edit Task</DialogTitle>
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
                defaultValue={task.remark}
                required
              />
              <br /><br />
              <TextField
                id="standard-multiline-static"
                name='contactperson'
                label="Contact Person"
                fullWidth
                variant="standard"
                defaultValue={task.contactperson}
                required
              />
              <br /><br />
              <Autocomplete
                size='small'
                id="combo-box-demo"
                options={[{label:'Finance'}, {label:'Admin'}, {label:'Shipping/Billing'}, {label:'HR'}, {label:'Delivery'}]}
                renderInput={(params) => <TextField defaultValue={task.contactrole}  variant='standard' name='contactrole' {...params} label='Contact Role' required/>}
                required
              />
              <br /><br />
              <Autocomplete
                size='small'
                id="combo-box-demo"
                options={[{label:'OPEN'}, {label:'INPROGRESS'}, {label:'COMPLETED'}]}
                defaultValue={'OPEN'}
                renderInput={(params) => <TextField defaultValue={task.status}  variant='standard' name='status' {...params} label='Status' />}
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
                  defaultValue={moment(task.followupdate).format('YYYY-MM-DD')}
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
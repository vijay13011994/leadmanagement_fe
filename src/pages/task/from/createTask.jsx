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
import { getContactListService } from '../../../services/contact.service';

export default function CreateTaskDialog({open, setOpen, leadid, getTasks, opportinityid}) {
  const [ contactRole, setContactRole] = React.useState('');
  const [ contactPerson, setContactPerson] = React.useState('');
  const handleClose = () => {
    setOpen(false);
  };
  const [ contacts, setContacts] = React.useState([]);

  React.useEffect(()=>{
    getContactListService().then(({contacts})=>{
      setContacts(contacts.map(contact => {
        return {
          id: contact.id,
          label: contact.first_name+" "+contact.last_name
        }
      }));
    }).catch(e=>{
      alert(e);
    });
  },[]);

  const submitForm = async(e) =>{
    try{
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const formJson = Object.fromEntries(formData.entries());
        formJson.leadid = leadid?leadid:null;
        formJson.opportinityid = opportinityid?opportinityid:null;
        const {msg} = await createTask(formJson);
        alert("Task created successfully!");
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
                name='subject'
                label="Subject"
                fullWidth
                variant="standard"
                required
              />
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
              {contactPerson!=='Others' &&
                <Autocomplete
                  size='small'
                  id="combo-box-demo"
                  value={contactPerson}
                  options={contacts}
                  onChange={(e, value)=> {
                    setContactPerson(value.label)
                  }}
                  renderInput={(params) => <TextField  variant='standard' name='contactperson' {...params} label='Contact Person' required/>}
                  required
                />
              }
              <br /><br />
              {contactRole!=='Others' &&
                <Autocomplete
                  size='small'
                  id="combo-box-demo"
                  value={contactRole}
                  options={[{label:'Owner'}, {label:'Purchaser'}, {label:'Engineer'}, {label:'Acounts'}, {label:'Others'}]}
                  onChange={(e, value)=> {
                    setContactRole(value.label)
                  }}
                  renderInput={(params) => <TextField  variant='standard' name='contactrole' {...params} label='Contact Role' required/>}
                  required
                />
              }
              {contactRole==='Others' && <TextField
                id="standard-multiline-static"
                name='contactrole'
                label="Contact Role"
                fullWidth
                variant="standard"
                required
              />}
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
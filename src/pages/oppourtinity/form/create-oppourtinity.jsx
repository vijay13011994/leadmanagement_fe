import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { createOpportinity } from '../../../services/opportinity';
import { getLeadByUserId } from '../../../services/lead.service';
import { Autocomplete, Box } from '@mui/material';

export default function CreateOppourtinity({open, setOpen, getOppo, accountId}) {
  const userId = sessionStorage.getItem('userId');
  const handleClose = () => {
    setOpen(false);
  };
  const [leads, setLeads] = React.useState([]);

  const getAssignedLeads = async () => {
    try{
      const {leads} = await getLeadByUserId(userId);
      setLeads(leads);
    }catch(e){
      alert(e);
    }
  }

  React.useEffect(()=>{
    getAssignedLeads();
  },[])

  const submitForm = async(e) =>{
    try{
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const formJson = Object.fromEntries(formData.entries());
        formJson.account_id = accountId;
        const {msg} = await createOpportinity(formJson);
        alert(msg);
        getOppo();
        handleClose();
    }catch(e){
        alert(e);
    }
  }

  return (
    <React.Fragment>
      <Dialog open={open} onClose={handleClose} fullWidth='xs' maxWidth='xs'>
        <form onSubmit={submitForm}>
          <DialogTitle style={{textDecoration:'underline', fontWeight:'bold'}}>Oppourtinity</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              name="name"
              label="Oppourtinity Name"
              type="text"
              fullWidth
              variant="standard"
            />
            <br />
            <TextField
              autoFocus
              margin="dense"
              id="description"
              name="description"
              label="Description"
              type="text"
              fullWidth
              multiline
              maxRows={4}
              variant="standard"
            />
            {/* <br />
            <Autocomplete
              size='small'
              id="combo-box-demo"
              options={leads}
              onChange={onLeadChange}
              getOptionLabel={(option) => `${option.firstname} ${option.lastname}`}
              renderInput={(params) => <TextField variant='standard' name='leadid' {...params} label='Lead' />}
            /> */}
            <br />
            <Autocomplete
              fullWidth
              size='small'
              id="combo-box-demo"
              options={[{label:'INPROGRESS'}, {label:'NEGOTIATION'}, {label:'TYSCB'}, {label:'CLOSELOST'}]}
              renderInput={(params) => <TextField variant='standard' name='status' {...params} label='Status'/>}
            />
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
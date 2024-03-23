import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Autocomplete } from '@mui/material';
import { getAccountListService } from '../../../services/account.service';
import { createContactService } from '../../../services/contact.service';

export default function CreateContact({open, setOpen, getContactListByAcccountId}) {
  const [accounts, setAccounts] = React.useState([])
  const [formData, setFormData] = React.useState()
  const handleClose = () => {
    setOpen(false);
  };

  const onAccountChange = (e, value)=>{
    if(value){
        setFormData(prev=>{
            const temp = {...prev};
            temp['account_id'] = value.id;
            return temp;
        })
    }
  }

  const onInputChange = (e)=>{
    setFormData(prev=>{
        const temp = {...prev};
        temp[e.target.name] = e.target.value;
        return temp;
    });
  }

  const submitForm = async (e) =>{
    try{
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const formJson = Object.fromEntries(formData.entries());
        const {msg} = await createContactService(formJson);
        alert("Contact created successfully!");
        getContactListByAcccountId();
        handleClose();
    }catch(e){
        alert(e);
    }
  }

  const getAllAccount = async()=>{
    try{
        const {accounts} = await getAccountListService();
        setAccounts(accounts.map(account=>{
            return {
                id: account.id,
                label: account.account_name
            }
        }))
    }catch(e){
        alert(e);
    }
  }

  React.useEffect(()=>{
    getAllAccount();
  },[]);

  return (
    <React.Fragment>
      <Dialog open={open} onClose={handleClose} fullWidth='xs' maxWidth='xs'>
        <form onSubmit={submitForm}>
          <DialogTitle style={{textDecoration:'underline', fontWeight:'bold'}}>Create Account</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="first_name"
              name='first_name'
              label="First Name"
              type="text"
              fullWidth
              variant="standard"
              onChange={onInputChange}
              required
            />
            <br />
            <TextField
              autoFocus
              margin="dense"
              id="last_name"
              name='last_name'
              label="Last Name"
              type="text"
              fullWidth
              variant="standard"
              onChange={onInputChange}
              required
            />
            <br />
            <TextField
              autoFocus
              margin="dense"
              id="phone_number"
              name='phone_number'
              label="Phone Number"
              fullWidth
              variant="standard"
              onChange={onInputChange}
              required
            />
            <br />
            <TextField
              autoFocus
              margin="dense"
              id="email"
              name='email'
              label="Email"
              fullWidth
              variant="standard"
              onChange={onInputChange}
              required
            />
            <br />
            <TextField
              autoFocus
              margin="dense"
              id="company_name"
              name='company_name'
              label="Company Name"
              fullWidth
              variant="standard"
              onChange={onInputChange}
              required
            />
            <br /><br />
            <Autocomplete
                size='small'
                name='leadid'
                disablePortal
                id="combo-box-demo"
                options={accounts}
                onChange={onAccountChange}
                renderInput={(params) => <TextField variant='standard'  {...params} label="Account" required/>}
                required
            />
            <br />
            <Autocomplete
                size='small'
                name='role'
                id="combo-box-demo"
                options={[{label:'Finance'}, {label:'Admin'}, {label:'Shipping/Billing'}, {label:'HR'}, {label:'Delivery'}]}
                renderInput={(params) => <TextField  variant='standard' name='role' {...params} label='Role' required/>}
                required
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
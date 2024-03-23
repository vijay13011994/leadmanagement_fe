import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { Card, Checkbox, TextField } from '@mui/material';
import { createLead } from '../../../services/lead.service';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function EditLead({open, setopen}) {
  const handleClose = () => {
    setopen(false);
  };

  const submitForm = async(e) =>{
    try{
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const formJson = Object.fromEntries(formData.entries());
      if(formJson.isrenewal === "on"){
        formJson.isrenewal = true;
      }else{
        formJson.isrenewal = false;
      }
      const msg = await createLead(formJson);
      alert("Lead updated successfully!");
      handleClose();
    }catch(e){
      alert(e);
    }
  }

  return (
    <React.Fragment>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Edit Lead
            </Typography>
          </Toolbar>
        </AppBar>
        <Card style={{marginLeft:'10%', marginRight:'10%', marginTop:'2%', marginBottom:'2%'}}>
            <br />
            <center><h2 style={{textDecoration:'underline'}}>Lead Information</h2></center>
            <form autoComplete='off' onSubmit={submitForm}>
                <TextField name="firstname" label="First Name" variant="outlined" size='small' required/>
                <TextField name="lastname" label="Last Name" variant="outlined" size='small' style={{marginRight:'10px'}} required/>
                <TextField name="source" label="Source" variant="outlined" size='small' style={{marginRight:'10px'}} required/>
                <TextField name="companyname" label="Company Name" variant="outlined" size='small' style={{marginRight:'10px'}} required/>
                <TextField name="websiteurl" label="Website" variant="outlined" size='small' style={{marginRight:'10px'}} required/>
                <br /><br />
                <TextField name="billingaddress" label="Billing Address" variant="outlined" size='small' style={{marginRight:'10px', marginLeft:'15px'}} required/>
                <TextField name="shippingaddress" label="Shipping Address" variant="outlined" size='small' style={{marginRight:'10px'}} required/>
                <TextField name="description" label="Description" variant="outlined" size='small' style={{marginRight:'10px'}} required/>
                <TextField name="intrestedon" label="Intrested On" variant="outlined" size='small' style={{marginRight:'10px'}} required/>
                <select name='status' style={{width:'220px', height:'38px', marginRight:'10px'}} required>
                    <option value="">Select Status</option>
                    <option value="assigned">Assigned</option>
                    <option value="cold">Cold</option>
                    <option value="hot">Hot</option>
                    <option value="converted">Converted</option>
                </select>
                <br /><br />
                <TextField type='number' name="score" label="Scoring" variant="outlined" size='small' style={{marginRight:'10px', marginLeft:'15px'}} required/>
                <select name='quality' style={{width:'220px', height:'38px', marginRight:'10px'}} required>
                    <option value="">Select Quality</option>
                    <option value="Good Referral">Good Referral</option>
                    <option value="Bad Referral">Bad Referral</option>
                </select>
                <select name='ownerid' style={{width:'220px', height:'38px', marginRight:'10px'}} required>
                    <option value="">Select Assignee</option>
                    <option value={1}>Vijay</option>
                    <option value={2}>Anuj</option>
                </select>
                <br /><br />
                <Checkbox style={{marginLeft:'15px'}} name='isrenewal' color="secondary" />
                Do You Want to Renew?
                <br /><br />
                <center><Button type='submit' variant='contained' color='success'>Save</Button></center>
                <br /><br />
            </form>
        </Card>
      </Dialog>
    </React.Fragment>
  );
}
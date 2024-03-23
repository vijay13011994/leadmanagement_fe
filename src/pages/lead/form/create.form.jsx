import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { Autocomplete, Card, Grid, TextField } from '@mui/material';
import { createLead } from '../../../services/lead.service';
import { getAllUsers } from '../../../services/user.service';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const isAdmin = sessionStorage.getItem('isAdmin') === 'true'?true:false;

export default function CreateLead({open, setopen, getAllLeads}) {
  const [users, setUsers] = React.useState([]);
  const [ownerid, setOwnerid] = React.useState(null);
  
  React.useEffect(() => {
    getAllUsers().then(({ users, msg }) => {
        users.push({name: 'UNASSIGNED', id: -1});
        setUsers(users.map(user=>{
          return {
            label: user.name,
            id: user.id
          }
        }));
    }).catch(e => {
        alert(e);
    });
}, []);
  const handleClose = () => {
    setopen(false);
  };

  const submitForm = async(e) =>{
    try{
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const formJson = Object.fromEntries(formData.entries());
      if(formJson.scoring === ''){
        formJson.scoring = 0;
      }
      if(ownerid){
        formJson.ownerid = ownerid;
      }else{
        formJson.ownerid = +sessionStorage.getItem('userId');
      }
      const {msg} = await createLead(formJson);
      alert("Lead created successfully!");
      getAllLeads();
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
              Lead Creation
            </Typography>
          </Toolbar>
        </AppBar>
        <Card style={{marginLeft:'10%', marginRight:'10%', marginTop:'2%', marginBottom:'2%', overflowY:'scroll'}}>
            <br />
            <center><h2 style={{textDecoration:'underline'}}>Lead Information</h2></center>
            <Grid container>
              <Grid item xl={12} style={{padding:'10px'}}>
                <form autoComplete='off' onSubmit={submitForm}>
                    <Grid container spacing={4}>
                      <Grid item xl={6} xs={12}>
                        <TextField fullWidth name="firstname" label="First Name" variant="standard" size='small' required/>
                      </Grid>
                      <Grid item xl={6} xs={12}>
                        <TextField fullWidth name="lastname" label="Last Name" variant="standard" size='small'  required/>
                      </Grid>
                    </Grid>
                    <br />
                    <Grid container spacing={4}>
                      <Grid item xl={6} xs={12}>
                        <TextField fullWidth name="source" label="Source" variant="standard" size='small'  required/>
                      </Grid>
                      <Grid item xl={6} xs={12}>
                      <TextField fullWidth name="companyname" label="Company Name" variant="standard" size='small'  required/>
                      </Grid>
                    </Grid>
                    <br />
                    <Grid container spacing={4}>
                      <Grid item xl={6} xs={12}>
                        <TextField fullWidth name="billingaddress" label="Billing Address" variant="standard" size='small' required/>
                      </Grid>
                      <Grid item xl={6} xs={12}>
                        <TextField fullWidth name="shippingaddress" label="Shipping Address" variant="standard" size='small'  required/>
                      </Grid>
                    </Grid>
                    <br />
                    <Grid container spacing={4}>
                      <Grid item xl={6} xs={12}>
                        <TextField multiline maxRows={4} fullWidth name="description" label="Description" variant="standard" size='small'  required/>
                      </Grid>
                      <Grid item xl={6} xs={12}>
                        <TextField fullWidth name="intrestedon" label="Intrested On" variant="standard" size='small'  required/>
                      </Grid>
                    </Grid>
                    <br />
                    <Grid container spacing={4}>
                      <Grid item xl={6} xs={12}>
                        <Autocomplete
                            fullWidth
                            size='small'
                            id="combo-box-demo"
                            options={[{label:'HOT'}, {label:'COLD'}, {label:'OPEN'}, {label:'ASSIGNED'}, {label:'CONVERTED'}]}
                            renderInput={(params) => <TextField variant='standard' name='status' {...params} label='Status' required/>}
                        />
                      </Grid>
                      <Grid item xl={6} xs={12}>
                        <Autocomplete
                            fullWidth
                            size='small'
                            id="combo-box-demo"
                            options={[{label:'Good Referral'}, {label:'BAD Referral'}]}
                            renderInput={(params) => <TextField variant='standard' name='quality' {...params} label='Quality' required/>}
                        />
                      </Grid>
                    </Grid>
                    <br />
                    <Grid container spacing={4}>
                      <Grid item xl={6} xs={12}>
                        <TextField fullWidth type='number' name="scoring" label="Scoring" variant="standard" size='small'/>
                      </Grid>
                      <Grid item xl={6} xs={12}>
                        <TextField fullWidth type='email' name="email" label="Email" variant="standard" size='small'/>
                      </Grid>
                    </Grid>
                    <br />
                    <Grid container spacing={4}>
                      {isAdmin && 
                      <Grid item xl={6} xs={12}>
                        <Autocomplete
                            fullWidth
                            size='small'
                            id="combo-box-demo"
                            options={users}
                            onChange={(e, val)=>setOwnerid(val.id)}
                            renderInput={(params) => <TextField variant='standard' {...params} label='Owner' required/>}
                        />
                      </Grid>}
                      <Grid item xl={6} xs={12}>
                        <TextField fullWidth type='mobileno' name="mobileno" label="Mobile No." variant="standard" size='small' required/>
                      </Grid>
                    </Grid>
                    <br /><br />
                    <center><Button type='submit' variant='contained' color='success'>Submit</Button></center>
                    <br /><br />
                </form>
              </Grid>
            </Grid>
        </Card>
      </Dialog>
    </React.Fragment>
  );
}
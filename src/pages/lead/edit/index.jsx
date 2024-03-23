import { Autocomplete, Button, Checkbox, CircularProgress, Container, Grid, Paper, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import BasicAccordion from '../components/accordn.componet';
import { createLead, getLeadById } from '../../../services/lead.service';
import { getAllUsers } from '../../../services/user.service';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
const isAdmin = sessionStorage.getItem('isAdmin') === 'true'?true:false;

export default function EditLead({ getAllLeads }) {
    const navigate = useNavigate();
    const [data, setdata] = useState(null);
    const { id } = useParams();
    const [status, setstatus] = useState(null);
    const stepers = ['HOT', 'COLD', 'ASSIGNED', 'OPEN', 'CONVERTED'];
    const [selectedOwner, setSelectedOwner] = useState(null);
    const [selectedOwnerName, setSelectedOwnerName] = useState(null);

    const [users, setUsers] = useState([]);
    const onOwnerChange = (e, value) => {
        if (value) {
            setSelectedOwnerName(value.label)
            setSelectedOwner(value.id);
        }
    }
    const getUsers = async(userId)=>{
        try{
            const { users, msg } = await getAllUsers();
            users.push({name: 'UNASSIGNED', id: -1});
            const x = users.map(user=> {
                if(user.id == userId){
                    setSelectedOwnerName(user.name);  
                }
                return {label: user.name, id: user.id}
            });
            setUsers(x);
        }catch(e){
            alert(e);
        }
    }
    useEffect(() => {
        getLeadById(id).then(({ lead, msg }) => {
            setdata(lead);
            setstatus(lead.status);
            getUsers(lead.ownerid);
        }).catch(e => {
            alert(e.message);
        });
    }, []);

    const submitForm = async (e, data) => {
        try {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            formJson.id = data.id;
            formJson.ownerid = selectedOwner;
            formJson.isrenewal = formData.isrenewal === "on" ? true : false;
            const { msg } = await createLead(formJson);
            alert("Lead updated successfully!");
        } catch (e) {
            alert(e);
        }
    }

    return (
        <>
            {data ? 
                <>
                <br />
                <Button variant='outlined' color='error' onClick={()=> navigate(-1)} style={{marginLeft:'5px'}}><ArrowBackIcon fontSize='small'/></Button>
                <br /><br />
                <div style={{ height: '50px', boxShadow: '1px 1px #888888', border:'1px solid #888888', padding:'10px 10px 0px 10px', borderRadius:'5px' }}>
                    {
                        stepers.map(step => {
                            return (
                                <Button variant='contained' color={status === step ? 'warning' : 'success'} style={{ borderStartStartRadius: '350px', borderEndStartRadius: '350px', width: '20%' }}>
                                    {step}
                                </Button>
                            )
                        })
                    }
                </div>
                <br />
                <Grid container spacing={2}>
                    <Grid xl={8} style={{ padding: '25px' }}>
                        <form autoComplete='off' onSubmit={(e) => submitForm(e, data)}>
                            <Grid container spacing={2}>
                                <Grid item xl={6} xs={12}>
                                    <TextField
                                        fullWidth
                                        id="firstname"
                                        name='firstname'
                                        label="First Name"
                                        defaultValue={data.firstname}
                                        variant="standard"
                                    />
                                </Grid>
                                <Grid item xl={6} xs={12}>
                                    <TextField
                                        fullWidth
                                        id="lastname"
                                        name='lastname'
                                        label="Last Name"
                                        defaultValue={data.lastname}
                                        variant="standard"
                                    />
                                </Grid>
                            </Grid>
                            <br />
                            <Grid container spacing={2}>
                                <Grid item xl={6} xs={12}>
                                    <TextField
                                        fullWidth
                                        id="source"
                                        name='source'
                                        label="Source"
                                        defaultValue={data.source}
                                        variant="standard"
                                    />
                                </Grid>
                                <Grid item xl={6} xs={12}>
                                    <TextField
                                        fullWidth
                                        id="companyname"
                                        name='companyname'
                                        label="Company Name"
                                        defaultValue={data.companyname}
                                        variant="standard"
                                    />
                                </Grid>
                            </Grid>
                            <br />
                            <Grid container spacing={2}>
                                <Grid item xl={6} xs={12}>
                                        <TextField
                                            fullWidth
                                            id="shippingaddress"
                                            name='shippingaddress'
                                            label="Shipping Address"
                                            defaultValue={data.shippingaddress}
                                            variant="standard"
                                        />
                                </Grid>
                                <Grid item xl={6} xs={12}>
                                    <TextField
                                        fullWidth
                                        id="billingaddress"
                                        name='billingaddress'
                                        label="Billing Address"
                                        defaultValue={data.billingaddress}
                                        variant="standard"
                                    />
                                </Grid>
                            </Grid>
                            <br />
                            <Grid container spacing={2}>
                                <Grid item xl={6} xs={12}>
                                    <TextField
                                        fullWidth
                                        id="interestedon"
                                        name='intrestedon'
                                        label="Interested On"
                                        defaultValue={data.intrestedon}
                                        variant="standard"
                                    />
                                </Grid>
                                <Grid item xl={6} xs={12}>
                                    <TextField
                                        fullWidth
                                        id="description"
                                        name='description'
                                        label="Description"
                                        defaultValue={data.description}
                                        variant="standard"
                                    />
                                </Grid>
                            </Grid>
                            <br />
                            <Grid container spacing={2}>
                                
                                <Grid item xl={6} xs={12}>
                                    <Autocomplete
                                        fullWidth
                                        size='small'
                                        id="combo-box-demo"
                                        defaultValue={data.status.toUpperCase()}
                                        options={[{ label: 'HOT' }, { label: 'COLD' }, { label: 'OPEN' }, { label: 'ASSIGNED' }, { label: 'CONVERTED' }]}
                                        renderInput={(params) => <TextField variant='standard' name='status' {...params} label='Status' />}
                                    />
                                </Grid>
                                <Grid item xl={6} xs={12}>
                                    <TextField
                                        fullWidth
                                        type='email'
                                        id="email"
                                        name='email'
                                        label="Email"
                                        defaultValue={data.email}
                                        variant="standard"
                                    />
                                </Grid>
                            </Grid>
                            <br />
                            <Grid container spacing={2}>
                                <Grid item xl={6} xs={12}>
                                    <TextField
                                        fullWidth
                                        type='number'
                                        id="scoring"
                                        name='scoring'
                                        label="Scoring"
                                        defaultValue={data.scoring}
                                        variant="standard"
                                    />
                                </Grid>
                                <Grid item xl={6} xs={12}>
                                    <TextField
                                        fullWidth
                                        id="quality"
                                        name='quality'
                                        label="Quality"
                                        defaultValue={data.quality}
                                        variant="standard"
                                    />
                                </Grid>
                            </Grid>
                            <br />
                            <Grid container spacing={2}>
                                {isAdmin && <Grid item xl={6} xs={12}>
                                    <Autocomplete
                                        size='small'
                                        id="combo-box-demo"
                                        value={selectedOwnerName}
                                        options={users}
                                        onChange={onOwnerChange}
                                        renderInput={(params) => <TextField variant='standard' {...params} label='Owner'/>}
                                    />
                                </Grid>}
                            </Grid>
                            <br />
                            <center><Button variant='contained' type='submit' color='success'>Save Changes</Button></center>
                            <br /><br />
                        </form>
                    </Grid>
                    <Grid xl={4} style={{ width: '100%', overflowX: 'scroll' }}>
                        <BasicAccordion id={data.id} />
                    </Grid>
                </Grid>
            </> : <center><CircularProgress /></center>
            }
        </>
    )
}

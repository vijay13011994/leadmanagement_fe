import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Card, CardContent, CardHeader, Grid, TextField } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { createContactService, getContactByIdService } from '../../../services/contact.service';
import OpprotinitiesCollapsibleTable from '../../oppourtinity/components/table.component';
import Conversation from '../../convertation';
export default function EditContact() {
  const navigate = useNavigate();
  const {id} = useParams();
  const [contact, setContact] = useState(null);
  const getContactById = async()=>{
    try{
        const {contact, msg} =  await getContactByIdService(id);
        console.log(contact)

        delete contact.createdAt;
        delete contact.updatedAt;
        setContact(contact);
    }catch(e){
        alert(e);
    }
  }

  const onInputChange = (e)=>{
    try{
      setContact(prev=>{
            const temp = {...prev};
            temp[e.target.name] = e.target.value;
            return temp;
        })
    }catch(e){
        alert(e);
    }
  }

  useEffect(()=>{
    getContactById();
  }, []);

  const submitForm = async (e) => {
    try {
            e.preventDefault();
            console.log(contact)
            const {msg} = await createContactService(contact);
            alert(msg)
        } catch (e) {
            console.log(e);
        }
    }

  return (
    <>
        <br />
        <Button variant='outlined' color='error' onClick={()=> navigate(-2)} style={{marginLeft:'5px'}}><ArrowBackIcon fontSize='small'/></Button>
        {contact && <Grid container spacing={2}>
            <Grid item xl={6} sm={12}>
                <Card>
                    <CardHeader title="Contact Details"></CardHeader>
                    <CardContent>
                        <form onSubmit={submitForm}>
                            <Grid container spacing={2}>
                                <Grid item xl={6} sm={12}>
                                    <TextField
                                        fullWidth
                                        id="first_name"
                                        name='first_name'
                                        label="First Name"
                                        variant="standard"
                                        onChange={onInputChange}
                                        defaultValue={contact.first_name}
                                        required
                                    />
                                </Grid>
                                <Grid item xl={6} sm={12}>
                                    <TextField
                                        fullWidth
                                        id="last_name"
                                        name='last_name'
                                        label="Last Name"
                                        variant="standard"
                                        onChange={onInputChange}
                                        defaultValue={contact.last_name}
                                        required
                                    />
                                </Grid>
                                <Grid item xl={6} sm={12}>
                                    <TextField
                                        fullWidth
                                        id="phone_number"
                                        name='phone_number'
                                        label="Phone Number"
                                        variant="standard"
                                        onChange={onInputChange}
                                        defaultValue={contact.phone_number}
                                    />
                                </Grid>
                                <Grid item xl={6} sm={12}>
                                    <TextField
                                        fullWidth
                                        id="email"
                                        name='email'
                                        label="Email"
                                        variant="standard"
                                        onChange={onInputChange}
                                        defaultValue={contact.email}
                                        required
                                    />
                                </Grid>
                                <Grid item xl={6} sm={12}>
                                    <TextField
                                        fullWidth
                                        id="company_name"
                                        name='company_name'
                                        label="Company Name"
                                        variant="standard"
                                        onChange={onInputChange}
                                        defaultValue={contact.company_name}
                                        required
                                    />
                                </Grid>
                            </Grid>
                            <br /><br />
                            <center><Button type='submit' size='small' variant='contained' color='success'>Save Changes</Button></center>
                        </form>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xl={6} sm={12}>
                <Conversation id={id}/>
            </Grid>
        </Grid>}
    </>
  )
}

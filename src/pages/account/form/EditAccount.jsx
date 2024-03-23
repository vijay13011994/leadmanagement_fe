import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { createAccountService, getAccountByIdService } from '../../../services/account.service';
import { Accordion, AccordionDetails, AccordionSummary, Button, Card, CardContent, CardHeader, Grid, TextField, Typography } from '@mui/material';
import Contact from '../../contact';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import OpprotinitiesCollapsibleTable from '../../oppourtinity/components/table.component';
import { getOpportinities, getOpportinityByAccountIdService } from '../../../services/opportinity';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Opprourtinity from '../../oppourtinity';
import { getContactListByAcccountIdService } from '../../../services/contact.service';

export default function EditAccount() {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const {id} = useParams();
  const [account, setAccount] = useState(null);
  const [opportunities, setOpportunities] = useState([]);
  const [contacts, setContacts] = useState([]);
  
  const getAccountById = async()=>{
    try{
        const {account, msg} =  await getAccountByIdService(id);
        setAccount(account);
        delete account.createdAt;
        delete account.updatedAt;
        setFormData(account)
    }catch(e){
        alert(e);
    }
  }

  const getOpportunitiesByAccountId = async()=>{
    try{
        const {opportunities} = await getOpportinityByAccountIdService(id);
        setOpportunities(opportunities);
    }catch(e){
        alert(e);
    }
  }

  const onInputChange = (e)=>{
    try{
        setFormData(prev=>{
            const temp = {...prev};
            temp[e.target.name] = e.target.value;
            return temp;
        })
    }catch(e){
        alert(e);
    }
  }

  const getContactListByAcccountId = async()=>{
    try{
      const {contacts, msg} = await getContactListByAcccountIdService(id);
      setContacts(contacts);
    }catch(e){
      alert(e);
    }
  }

  useEffect(()=>{
    getAccountById();
    getOpportunitiesByAccountId();
    getContactListByAcccountId();
  }, []);

  const submitForm = async (e) => {
    try {
            e.preventDefault();
            formData.id = account.id;
            const {msg} = await createAccountService(formData);
            alert("Account updated successfully!");
        } catch (e) {
            alert(e);
        }
    }

  return (
    <>
        <br />
        <Button variant='outlined' color='error' onClick={()=> navigate(-2)} style={{marginLeft:'5px'}}><ArrowBackIcon fontSize='small'/></Button>
        {account && 
            <Grid container spacing={2}>
                <Grid item xl={6} xs={12}>
                    <Card>
                        <CardHeader title="Account Details"></CardHeader>
                        <CardContent>
                            <form onSubmit={submitForm}>
                                <Grid container spacing={2}>
                                    <Grid item xl={6} xs={12}>
                                        <TextField
                                            fullWidth
                                            id="account_name"
                                            name='account_name'
                                            label="Account Name"
                                            variant="standard"
                                            onChange={onInputChange}
                                            defaultValue={account.account_name}
                                        />
                                    </Grid>
                                    <Grid item xl={6} xs={12}>
                                        <TextField
                                            fullWidth
                                            id="billing_address"
                                            name='billing_address'
                                            label="Billing Address"
                                            variant="standard"
                                            onChange={onInputChange}
                                            defaultValue={account.billing_address}
                                        />
                                    </Grid>
                                    <Grid item xl={6} xs={12}>
                                        <TextField
                                            fullWidth
                                            id="name"
                                            name='shipping_address'
                                            label="Shipping Address"
                                            variant="standard"
                                            onChange={onInputChange}
                                            defaultValue={account.shipping_address}
                                        />
                                    </Grid>
                                    <Grid item xl={6} xs={12}>
                                        <TextField
                                            fullWidth
                                            id="name"
                                            name='total_amount'
                                            label="Total Amount"
                                            variant="standard"
                                            onChange={onInputChange}
                                            defaultValue={account.total_amount}
                                            disabled
                                        />
                                    </Grid>
                                </Grid>
                                <br /><br />
                                <center><Button type='submit' size='small' variant='contained' color='success'>Save Changes</Button></center>
                            </form>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xl={6} xs={12} style={{ width: '100%', overflowX: 'scroll' }}>
                    <Accordion>
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                        >
                        <Typography><p style={{fontWeight:'bolder'}}>Contacts ({contacts.length})</p></Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Contact id={id} contacts={contacts} getContactListByAcccountId={getContactListByAcccountId}/>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                        >
                        <Typography><p style={{fontWeight:'bolder'}}>Opportunities ({opportunities.length})</p></Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Opprourtinity rows={opportunities} getOpportunitiesByAccountId={getOpportunitiesByAccountId} accountId={id}/>
                        </AccordionDetails>
                    </Accordion>
                </Grid>
            </Grid>}
    </>
  )
}

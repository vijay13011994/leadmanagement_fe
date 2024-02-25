import { styled } from '@mui/material/styles';
import { Autocomplete, Box, Button, Card, CardContent, CardHeader, Grid, Paper, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ProductAccordion from '../components/ProductAccordion.componet';
import { createOpportinity, getOpportinityById } from '../../../services/opportinity';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import TaskAccordion from '../components/TaskAccordion.comonent';
import { getMappedProductsByOppId } from '../../../services/productmappping';

export default function EditOppourtinity() {
    const [rows, setRows] = React.useState([]);
    const [total, setTotal] = React.useState(0);
    const {id} = useParams();
    const getMappedProducts = async()=>{
        try{  
          const {mappedProducts} = await getMappedProductsByOppId(id);
          setRows(mappedProducts);
          setTotal(mappedProducts.map(({ mrp, quantity, discount }) => mrp* quantity-discount).reduce((sum, i) => sum + i, 0));
        }catch(e){
          alert(e);
        }
      }
      React.useEffect(()=>{
        getMappedProducts();
      },[]);
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    const [status, setstatus] = useState('INPROGRESS');
    const stepers = ['INPROGRESS', 'NEGOTIATION', 'TYSCB', 'CLOSELOST'];
    const [oppourotinity, setOppourotinity] = React.useState(null);
    const getOppo = async () =>{
        try{
            const {opportunity, msg} = await getOpportinityById(id);
            setstatus(opportunity.status)
            setOppourotinity(opportunity);
        }catch(e){
            alert(typeof e ==='string'?e:e.message);
        }
    } 

    const submitForm = async(e) =>{
        try{
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            formJson.id = oppourotinity.id;
            formJson.account_id = oppourotinity.account_id;
            const {msg} = await createOpportinity(formJson);
            alert(msg);
            if(formJson.status === 'TYSCB' || formJson.status === 'CLOSELOST'){
                navigate(-2);
            }
        }catch(e){
            alert(e);
        }
    }

    React.useEffect(()=>{
        getOppo();
    },[]);

  return (
    <>
        <div style={{ height: '50px', boxShadow: '1px 1px #888888', border:'1px solid #888888', padding:'10px 10px 0px 10px', borderRadius:'5px' }}>
            {
                stepers.map(step => {
                    return (
                        <Button variant='contained' color={status === step ? 'warning' : 'success'} style={{ borderStartStartRadius: '350px', borderEndStartRadius: '350px', width: '25%' }}>
                            {step}
                        </Button>
                    )
                })
            }
        </div>
        <br />
        <div style={{padding:'15px'}}>
            <Grid container spacing={2}>
                <Grid xl={6}>
                    <Button variant='outlined' color='error' onClick={()=>navigate(-2)}><ArrowBackIcon/></Button>
                    <br />
                    <Card style={{padding:'10px'}}>
                        <CardHeader title="Opportinity Details"></CardHeader>
                        <CardContent>
                            {oppourotinity && <form onSubmit={submitForm}>
                                <Grid container spacing={2}>
                                    <Grid item xl={6}>
                                        <TextField
                                            fullWidth
                                            id="name"
                                            name='name'
                                            label="Opproutinity Name"
                                            variant="standard"
                                            defaultValue={oppourotinity.name}
                                        />
                                    </Grid>
                                    <Grid item xl={6}>
                                        <TextField
                                            fullWidth
                                            id="description"
                                            name='description'
                                            label="Description"
                                            variant="standard"
                                            defaultValue={oppourotinity.description}
                                        />
                                    </Grid>
                                </Grid>
                                <br />
                                <Grid container spacing={2}>
                                    <Grid item xl={6}>
                                        <Autocomplete
                                            fullWidth
                                            size='small' 
                                            id="combo-box-demo"
                                            defaultValue={oppourotinity.status}
                                            options={[{label:'INPROGRESS'}, {label:'NEGOTIATION'}, {label:'TYSCB'}, {label:'CLOSELOST'}]}
                                            renderInput={(params) => <TextField variant='standard' name='status' {...params} label='Status'/>}
                                        />
                                    </Grid>
                                    <br />
                                    <Grid item xl={6}>
                                        <TextField
                                            fullWidth
                                            id="total"
                                            name='total'
                                            label="Total"
                                            variant="standard"
                                            defaultValue={total}
                                            disabled
                                        />
                                    </Grid>
                                </Grid>
                                <br /><br />
                                {(status!=='TYSCB' && status!=='CLOSELOST') ?<Button type='submit' variant='contained' color='success'>Save Changes</Button>:''}
                                <br /><br />
                            </form>}
                        </CardContent>
                    </Card>
                </Grid>
                <Grid xl={6} style={{overflowX:'scroll'}}>
                    <Item>
                        <TaskAccordion open={open} setOpen={setOpen} opportinityid={id} status={status}/>
                        <br />
                        <ProductAccordion open={open} setOpen={setOpen} oppid={id} status={status} rows={rows} getMappedProducts={getMappedProducts}/>
                        <br />
                    </Item>
                </Grid>
            </Grid>
        </div>
    </>
  )
}

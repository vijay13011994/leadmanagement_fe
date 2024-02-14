import React, { useEffect, useState } from 'react'
import CollapsibleTable from './components/table.component'
import { getLeadList } from '../../services/lead.service';
import { Button } from '@mui/material';
import CreateLead from './form/create.form';
import EditLead from './form/edit.from';
import CreateTask from './form/task.component';

export default function Lead() {
  const [open, setopen] = useState(false);
  const [openedit, setopenedit] = useState(false);
  const [opentask, setopentask] = useState(false);
  const [leadid, setleadid] = useState(null);
  const [leads, setleads] = useState([]);

  const getAllLeads = async()=>{
    try{
      const { leads, msg} = await getLeadList();
      setleads(leads);
    }catch(e){
      alert(e.message);
    }
  }

  useEffect(()=>{
    getAllLeads();
  },[]);

  return (
    <>
      <center> <h3 style={{textDecoration:'underline'}}>All Leads</h3></center>
      <Button style={{float:'right', marginRight:'30px'}} variant="contained"
       color="primary" size='small' onClick={()=>setopen(true)}>Create</Button>
      <CreateLead open={open} setopen={setopen} getAllLeads={getAllLeads}/>
      <EditLead open={openedit} setopen={setopenedit} getAllLeads={getAllLeads}/>
      <CollapsibleTable rows={leads} setopen={setopenedit} setopentask={setopentask} setleadid={setleadid}  getAllLeads={getAllLeads}/>
      <CreateTask open={opentask} setopentask={setopentask} leadid={leadid}/>
    </>
  )
}

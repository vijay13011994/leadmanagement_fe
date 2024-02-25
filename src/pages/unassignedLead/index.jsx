import React, { useEffect, useState } from 'react'
import { getUnassignedLeadsService } from '../../services/lead.service';
import GetUnassignedLeadTable from './table';

export default function UnassignedLeads() {
    const [rows, setRows] = useState([]);
    const getUnassignedLeads = async () =>{
      try{
        const {leads} = await getUnassignedLeadsService();
        setRows(leads);
      }catch(e){
        alert(e);
      }
    }
    useEffect(()=>{
      getUnassignedLeads();
    },[]);
  return (
    <div>
      <GetUnassignedLeadTable data={rows} getUnassignedLeads={getUnassignedLeads}/>
    </div>
  )
}

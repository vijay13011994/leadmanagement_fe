import React, { useEffect, useState } from 'react'
import OpprotinitiesCollapsibleTable from './components/table.component'
import { Fab } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import CreateOppourtinity from './form/create-oppourtinity';
import { getOpportinityByAccountIdService } from '../../services/opportinity';

export default function Opprourtinity({rows, getOpportunitiesByAccountId, accountId}) {
  const [ open, setOpen ] = useState(false);
  useEffect(()=>{
  },[]);

  return (
    <>
      {rows.length >0 && 
        <Fab color="primary" aria-label="add" size='small' style={{float:'right', marginRight:'10px'}} onClick={()=> setOpen(true)}>
            <AddIcon />
        </Fab>
      }
      <OpprotinitiesCollapsibleTable rows={rows} getOpportunitiesByAccountId={getOpportunitiesByAccountId}/>
      <CreateOppourtinity open={open} setOpen={setOpen} getOppo={getOpportunitiesByAccountId} accountId={accountId}/>
    </>
  )
}

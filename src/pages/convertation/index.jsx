import React, { useEffect, useState } from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ConversationTable from './ConversationTable';
import { Typography } from '@mui/material';
import CreateConvertationDialog from './CreateConvertaton';
import { Chip, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { getConversationListService } from '../../services/convertation.service';

export default function Conversation({id}) {
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  useEffect(()=>{
    getConversationListService(id).then(({convertations})=>{
      setRows(convertations);
    }).catch(e=>{
      console.log(e);
    });
  },[])
  return (
    <div>
        <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
        <Typography><h3>CONVERTATIONS</h3></Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Fab color="primary" aria-label="add" size='small' style={{float:'right', marginRight:'10px'}} onClick={()=> setOpen(true)}>
            <AddIcon />
          </Fab>
          <ConversationTable rows={rows}/>    
        </AccordionDetails>
        </Accordion>
      <CreateConvertationDialog open={open} setOpen={setOpen} id={id}/>
    </div>
  )
}

import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AllTaskTable from '../../task/table';
import { getTaskFromOpportuniyId } from '../../../services/task.service';

export default function TaskAccordion({opportinityid, status }) {
  const [rows, setRows] = React.useState([]);
  const getTasks = async()=>{
    try{  
      const {tasks} = await getTaskFromOpportuniyId(opportinityid);
      setRows(tasks);
    }catch(e){
      alert(e);
    }
  }
  React.useEffect(()=>{
    getTasks();
  },[]);
    return (
        <div>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography style={{ fontWeight: 'bold', fontSize: '15px' }}>Tasks ({rows.length})</Typography>
                </AccordionSummary>
                <AccordionDetails>                    
                    <AllTaskTable data={rows} opportinityid={opportinityid} getTasks={getTasks} status={status}/>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}

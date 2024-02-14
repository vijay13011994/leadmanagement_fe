import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AllTaskTable from '../../task/table';
import { getTaskFromLeadId } from '../../../services/task.service';

export default function BasicAccordion(props) {
  const [data, setdata] = React.useState([]);
  const [count, setcount] = React.useState(0);

  const getTasks = async ()=>{
      try{
        const {tasks, msg} = await getTaskFromLeadId(props.id);
        setcount(tasks.length);
        setdata(tasks.slice(0,4));
      }catch(e){
        alert(e.message);
      }
  }

  React.useEffect(()=>{
    getTasks();
  }, []);

  return (
    <>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography style={{fontWeight:'bold', fontSize:'15px'}}>Tasks ({count})</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <AllTaskTable isChild={true} data={data} leadid={props.id} getTasks={getTasks}/>
        </AccordionDetails>
      </Accordion>
    </>
  );
}

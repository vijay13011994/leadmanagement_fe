import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import InvoiceComponent from './invoice.component';
import { getMappedProductsByOppId } from '../../../services/productmappping';

export default function ProductAccordion({oppid, status}) {
  const [rows, setRows] = React.useState([]);
  const getMappedProducts = async()=>{
    try{  
      const {mappedProducts} = await getMappedProductsByOppId(oppid);
      console.log(mappedProducts)
      setRows(mappedProducts);
    }catch(e){
      alert(e);
    }
  }
  React.useEffect(()=>{
    getMappedProducts()
  },[]);
    return (
        <div>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography style={{ fontWeight: 'bold', fontSize: '15px' }}>Products ({rows.length})</Typography>
                </AccordionSummary>
                <AccordionDetails>                    
                    <InvoiceComponent isChild={true} oppid={oppid} rows={rows} getMappedProducts={getMappedProducts} status={status}/>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}

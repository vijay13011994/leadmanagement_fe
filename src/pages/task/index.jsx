import React, { useEffect } from 'react'
import AllTaskTable from './table'
import { getTaskFromLeadId } from '../../services/task.service';
import { useSearchParams } from 'react-router-dom';

export default function Task(props) {
  const [data, setdata] = React.useState([]);
  const [searchparams] = useSearchParams();
  const leadid = searchparams.get('leadid');
  useEffect(()=>{
    getTaskFromLeadId(leadid).then(({tasks, msg})=>{
      setdata(tasks)
    }).catch(e=>{
      alert(e.message);
    })
  }, []);
  return (
    <>
      <center><h3 style={{textDecoration:'underline'}}>Task List</h3></center>
      <AllTaskTable data={data}/>
    </>
  )
}

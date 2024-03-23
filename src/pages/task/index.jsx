import React, { useEffect, useState } from 'react'
import AllTaskTable from './table'
import { getTaskFromLeadId, getTaskService } from '../../services/task.service';
import { useSearchParams } from 'react-router-dom';
import { Button, Grid } from '@mui/material';

export default function Task(props) {
  const [data, setdata] = React.useState([]);
  const [searchparams] = useSearchParams();
  const leadid = searchparams.get('leadid');
  const getTask = async ()=>{
    try{
      const {tasks} = await getTaskService({leadid});
      setdata(tasks);
    }catch(e){
      alert(e);
    }
  }
  useEffect(()=>{
    getTask();
  }, []);


  return (
    <>
      <center><h3 style={{textDecoration:'underline'}}>Task List</h3></center>
      <AllTaskTable data={data}/>
    </>
  )
}

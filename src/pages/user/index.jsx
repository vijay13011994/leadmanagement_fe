import React, { useEffect, useState } from 'react'
import UserTable from './table'
import { deleteUserById, getAllUsers } from '../../services/user.service';
import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CreateUser from './form/create-user';

export default function User() {
  const [rows, setrows] = useState([]);
  const [open, setOpen] = useState();
  const getUsers =  async() =>{
    try{
      const {users, msg} = await getAllUsers();
      setrows(users);
    }catch(e){
      alert(e);
    }
  }

  const deleteUser =  async(id) =>{
    try{
      const {msg} = await deleteUserById(id);
      getUsers();
    }catch(e){
      alert(e);
    }
  }

  useEffect(()=>{
    getUsers();
  },[]);
  return (
    <>
      <br />
      <Fab color="primary" aria-label="add" size='small' style={{float:'right', marginRight:'10px'}} onClick={()=> setOpen(true)}>
          <AddIcon />
      </Fab>
      <UserTable rows={rows} deleteUser={deleteUser}/>
      <CreateUser open={open} setOpen={setOpen} getUsers={getUsers}/>
    </>
  )
}

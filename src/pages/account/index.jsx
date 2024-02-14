import React, { useEffect, useState } from 'react'
import AccountTable from './tables'
import { getAccountListService } from '../../services/account.service';

export default function Account() {
  const [accounts, setAccounts] = useState([]);
  const getAccountList = async()=>{
    try{
      const {accounts, msg} = await getAccountListService();
      console.log(accounts)
      setAccounts(accounts);
    }catch(e){
      console.log(e);
    }
  }
  useEffect(()=>{
    getAccountList();
  },[])
  return (
    <>
        <AccountTable rows = {accounts}/>
    </>
  )
}

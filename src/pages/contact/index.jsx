import React, { useEffect, useState } from 'react'
import ContactTable from './table/ContactTable';
import { getContactListByAcccountIdService } from '../../services/contact.service';
import CreateContact from './form/CreateContact';
import ContactOpportinityTable from './table/ContactOpportinityTable';

export default function Contact({contacts, getContactListByAcccountId, id}) {
  const [open, setOpen] = useState(false);
  const [contactId, setContactId] = useState(null);

  return (
    <>
      <ContactTable rows={contacts} open={open} setOpen={setOpen}/>
      <CreateContact open={open} setOpen={setOpen} id={id} getContactListByAcccountId={getContactListByAcccountId}/>
    </>
  )
}

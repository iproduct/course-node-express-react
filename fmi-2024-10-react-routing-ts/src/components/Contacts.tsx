import React from 'react'
import { NavLink, Outlet, useLoaderData } from 'react-router-dom'
import { ContactsData } from '../service/contacts-loader';

type Props = {}

const Contacts = (props: Props) => {
  const { contacts } = useLoaderData() as ContactsData;
  return (
    <>
      <h3>Contacts</h3>
      <nav className='contacts'>
        {contacts.map(c => (<NavLink className='contact' key={c.id} to={'/contacts/' + c.id}>{c.fname} {c.lname}</NavLink>))}
      </nav>
      <hr />
      <Outlet />
    </>

  )
}

export default Contacts;
import React, { MouseEvent } from 'react'
import { NavLink, Outlet, useLoaderData, useNavigate, useNavigation } from 'react-router-dom'
import { ContactsData } from '../service/contacts-service';
import './Contacts.css';
import LoadingIndicator from './LoadingIndicator';

type Props = {}

const Contacts = (props: Props) => {
  const { contacts } = useLoaderData() as ContactsData;
  const navigate = useNavigate();
  const navigation = useNavigation();
  return (
    <>
      <h3>Contacts</h3>
      <nav className='contacts'>
        {contacts.map(c => (
          <div className='contact' key={c.id} onClick={event => navigate('/contacts/' + c.id)}>
            {c.fname} {c.lname}
          </div>))}
      </nav>
      <hr />
      {navigation.state === "loading" ? <LoadingIndicator /> :  <Outlet />}
      <div className='buttons'>
        <button onClick={() => navigate(-1)}>Go Back</button>
      </div>
    </>

  )
}

export default Contacts;
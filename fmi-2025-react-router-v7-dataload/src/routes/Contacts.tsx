import { Outlet, useLoaderData, useNavigate } from 'react-router';
import './Contacts.css';
import type { ContactsData } from '../service/contacts-service';


const Contacts = () => {
  const { contacts } = useLoaderData() as ContactsData;
  const navigate = useNavigate();
  return (
    <>
      <h3>Contacts</h3>
      <nav className='contacts'>
        {contacts.map(c => (
          <div className='contact' key={c.id} onClick={() => navigate('/contacts/' + c.id)}>
            {c.fname} {c.lname}
          </div>))}
      </nav>
      <hr />
      <Outlet />
      <div className='buttons'>
        <button onClick={() => navigate(-1)}>Go Back</button>
      </div>
    </>

  )
}

export default Contacts;
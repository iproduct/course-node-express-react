import { Outlet, useLoaderData, useNavigate } from 'react-router-dom';
import { ContactsData } from '../service/contacts-service';
import './Contacts.css';

type Props = {}

const Contacts = (props: Props) => {
  const { contacts } = useLoaderData() as ContactsData;
  const navigate = useNavigate();
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
      <Outlet />
      <div className='buttons'>
        <button onClick={() => navigate(-1)}>Go Back</button>
      </div>
    </>

  )
}

export default Contacts;
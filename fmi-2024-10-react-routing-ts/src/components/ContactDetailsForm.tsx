import { Form, useActionData, useLoaderData } from 'react-router-dom';
import { ContactActionResult, ContactData, ContactErrors } from '../service/contacts-service';
import './ContactDetailsForm.css';

type Props = {}

const ContactDetailsForm = (props: Props) => {
    let {errors, values} = (useActionData() || {errors: undefined, values: undefined}) as ContactActionResult;
    const loadedContact = useLoaderData() as ContactData;
    let contact = values || loadedContact;
    return (
        <Form method="PUT" className='contact-form'>
            <input name='id' defaultValue={contact.id} disabled />
            <input name='fname' defaultValue={contact.fname} />
            <input name='lname' defaultValue={contact.lname} />
            <input name='email' defaultValue={contact.email} />
            {errors?.email && <span className='error'>{errors.email}</span>}
            <input name='address' defaultValue={contact.address} />
            <input name='phone' defaultValue={contact.phone} />
            <button type="submit">Submit</button>
        </Form>
    )
}

export default ContactDetailsForm;
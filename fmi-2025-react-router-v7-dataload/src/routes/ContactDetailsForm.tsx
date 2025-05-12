import { Form, useActionData, useLoaderData } from 'react-router';
import './ContactDetailsForm.css';
import type { ContactActionResult, ContactData } from '../service/contacts-service';

const ContactDetailsForm = () => {
    const {errors, values} = (useActionData() || {errors: undefined, values: undefined}) as ContactActionResult;
    const loadedContact = useLoaderData() as ContactData;
    const contact = values || loadedContact;
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
import React, { useEffect, useState } from 'react'
import { Form, useLoaderData, useParams } from 'react-router-dom';
import { ContactData, getContact } from '../service/contacts-service';

type Props = {}

const ContactDetailsForm = (props: Props) => {
    let contact = useLoaderData() as ContactData;
    return (
        <div>
            <div>
                ContactDetails: {contact?.id}: {contact.fname} {contact?.lname} - {contact?.address}, {contact?.phone}
            </div>
            <div className='actions'>
                <Form method="PUT">
                    <input name='id' defaultValue={contact.id}/>
                    <input name='fname' defaultValue={contact.fname} />
                    <input name='lname' defaultValue={contact.lname} />
                    <input name='email' defaultValue={contact.email} />
                    <input name='address' defaultValue={contact.address} />
                    <input name='phone' defaultValue={contact.phone} />
                    <button type="submit">Submit</button>
                </Form>
            </div>
        </div>
    )
}

export default ContactDetailsForm;
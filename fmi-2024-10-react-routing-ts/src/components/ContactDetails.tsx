import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { ContactData, getContact } from '../service/contacts-loader';

type Props = {}

const ContactDetails = (props: Props) => {
    let { contactId } = useParams();
    const [contact, setContact] = useState<ContactData | undefined>()
    useEffect(() => {
        if (contactId) {
            getContact(+contactId).then(contact => {
                setContact(contact)
            })
        }
    }, [contactId])
    return (
        <div>ContactDetails: {contact?.id}: {contact?.fname} {contact?.lname} - {contact?.address}, {contact?.phone}</div>
    )
}

export default ContactDetails;
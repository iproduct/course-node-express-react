
import { Form, useLoaderData } from 'react-router';
import type { ContactData } from '../service/contacts-service';

const ContactDetails = () => {
    // let { contactId } = useParams();
    // const [contact, setContact] = useState<ContactData | undefined>()
    // useEffect(() => {
    //     if (contactId) {
    //         getContact(+contactId).then(contact => {
    //             setContact(contact)
    //         })
    //     }
    // }, [contactId])

    const contact = useLoaderData() as ContactData;
    return (
        <div>
            <div>
                ContactDetails: {contact?.id}: {contact?.fname} {contact?.lname} - {contact?.address}, {contact?.email}, {contact?.phone}
            </div>
            <div className='actions flex flex-raw items-center gap-9'>
                <Form method="PUT">
                    <button type="submit" className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded">
                        Edit
                    </button>
                </Form>
                <Form method="DELETE" onSubmit={(event) => {
                    if (!confirm("Please confirm you want to delete this record.")) {
                        event.preventDefault();
                    }
                }}>
                    <button type='submit' className="flex-shrink-0 bg-red-500 hover:bg-red-700 border-red-500 hover:border-red-700 text-sm border-4 text-white py-1 px-2 rounded">
                        Delete
                    </button>

                </Form>
            </div>
        </div>
    )
}

export default ContactDetails;
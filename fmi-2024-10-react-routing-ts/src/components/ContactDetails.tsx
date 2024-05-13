
import { Form, useLoaderData } from 'react-router-dom';
import { ContactData } from '../service/contacts-service';

type Props = {}

const ContactDetails = (props: Props) => {
    // let { contactId } = useParams();
    // const [contact, setContact] = useState<ContactData | undefined>()
    // useEffect(() => {
    //     if (contactId) {
    //         getContact(+contactId).then(contact => {
    //             setContact(contact)
    //         })
    //     }
    // }, [contactId])

    let contact = useLoaderData() as ContactData;
    return (
        <div>
            <div>
                ContactDetails: {contact?.id}: {contact?.fname} {contact?.lname} - {contact?.address}, {contact?.phone}
            </div>
            <div className='actions'>
                <Form method="PUT">
                    <button type="submit">Edit</button>
                </Form>
                <Form method="DELETE" onSubmit={(event) => {
                    // eslint-disable-next-line no-restricted-globals
                    if (!confirm("Please confirm you want to delete this record.")) {
                        event.preventDefault();
                    }
                }}>
                    <button type='submit'>Delete</button>

                </Form>
            </div>
        </div>
    )
}

export default ContactDetails;
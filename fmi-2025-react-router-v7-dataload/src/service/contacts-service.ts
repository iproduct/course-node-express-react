import { type ActionFunctionArgs, type LoaderFunctionArgs, redirect } from "react-router";

export interface ContactsData {
    contacts: ContactData[];
}

export interface ContactData {
    id: number,
    fname: string,
    lname: string,
    email: string,
    address: string,
    phone: string
}

export interface ContactErrors {
    fname?: string,
    lname?: string,
    email?: string,
    address?: string,
    phone?: string
}

export interface ContactActionResult {
    errors: ContactErrors,
    values: ContactData
}


const contacts: ContactsData = {
    contacts: [
        {
            id: 1,
            fname: 'Trayan',
            lname: 'Iliev',
            email: 'trayan@gmail.com',
            address: 'Sofia, 1000',
            phone: '+3598871234567'
        },
        {
            id: 2,
            fname: 'Georgi',
            lname: 'Ivanov',
            email: 'georgi@gmail.com',
            address: 'Plovdiv, 1000',
            phone: '+359885677888'
        },
        {
            id: 3,
            fname: 'Dimitrina',
            lname: 'Hristova',
            email: 'dima@gmail.com',
            address: 'Varna, 1000',
            phone: '+359887567432'
        },
        {
            id: 4,
            fname: 'Atanas',
            lname: 'Petrov',
            email: 'nasko@gmail.com',
            address: 'Sofia, 1000',
            phone: '+359883455656'
        },
    ]
}


export async function getContacts() {
    await new Promise(r => setTimeout(r, 500));
    return contacts;
}

export async function getContact(id: number) {
    await new Promise(r => setTimeout(r, 500));
    return contacts.contacts.find(c => c.id === id);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function contactLoader({ request, params }: LoaderFunctionArgs) {
    if (params.contactId && contacts.contacts.some(c => c.id + '' === params?.contactId)) {
        return getContact(+params.contactId);
    } else {
        throw new Error(`Invalid or missing post ID`);
    }
}

async function deleteContactByd(id: number) {
    contacts.contacts = contacts.contacts.filter(c => c.id !== id);
}

export async function contactAction({ request, params }: ActionFunctionArgs) {
    if (request.method === 'DELETE') {
        if(params.contactId) {
            await deleteContactByd(+params.contactId);
        }
        return redirect('/contacts');
    } else if (request.method === 'PUT') {
        return redirect(`/contacts/${params.contactId}/edit`);
    }
}

async function updateContact(contact: ContactData) {
    contacts.contacts = contacts.contacts.map(c => c.id === contact.id ? contact : c);
    return contact;
}

export async function contactFormAction({ request, params }: ActionFunctionArgs) {
    const errors: ContactErrors = {};
    if (request.method === 'PUT') {
        const formData = await request.formData();
        const contact = Object.fromEntries(formData) as unknown as ContactData;
        contact.id = +params.contactId!;
        console.log(contact);
        if (!contact.email.includes("@")) {
            errors.email = "That doesn't look like an email address";
        }
        if (Object.keys(errors).length) {
            return {errors, values: contact};
        }

        await updateContact(contact);
        return redirect(`/contacts/${params.contactId}`);
    }
}
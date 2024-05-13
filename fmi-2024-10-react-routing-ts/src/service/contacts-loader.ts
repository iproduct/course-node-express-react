import { LoaderFunctionArgs } from "react-router-dom";

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

export function contactLoader({ params }: LoaderFunctionArgs ) {
    if (params.contactId && contacts.contacts.some(c => c.id + '' === params?.contactId)) {
      return getContact(+params.contactId);
    } else {
      throw new Error(`Invalid or missing post ID`);
    }
  }
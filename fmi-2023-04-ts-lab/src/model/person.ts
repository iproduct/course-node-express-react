import { Identifiable } from "../common.js";

export interface Person extends Identifiable {
    firstName: string;
    lastName: string;
    email: string;
    contact?: Contact;
    greet: () => string;
}

export interface Contact {
    country: string;
    city?: string;
    address?: string;
    phone?: string;
}

export class NaturalPerson implements Person {
    constructor(
        public id: number,
        public firstName: string,
        public lastName: string,
        public email: string,
        public contact?: Contact | undefined
    ) { }

    greet(): string {
        const contact = this.contact ? ': ' + this.contact.toString() : '';
        return `${this.firstName} ${this.lastName} [${this.email}]${contact}`;
    }
}
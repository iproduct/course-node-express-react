import { IdType } from "./common-types";
import { Contact, Person } from "./person";

export interface User extends Person {
    role: Role;
    password: string;
    readonly salutation: string;
    toString(): string;
    // toString: () => string;
}

export enum Role {
    AUTHOR = 1, READER, ADMIN
}

type Role2 = 'ADMIN' | 'AUTHOR' | 'READER' | 'ANONIMOUS'

export class UserBase implements User {
    id: IdType = undefined;
    role: Role = Role.READER;
    constructor(
        public firstName: string,
        public lastName: string,
        public email: string,
        public password: string,
        public contact?: Contact
    ) {}

    get salutation() {
        return `Hello ${this.firstName} ${this.lastName} in role [${this.role}]`
    }
    toString(): string {
        return `ID: ${this.id}, Name: ${this.firstName} ${this.lastName}, Email: ${this.email}, 
        Password: ${this.password}, Role: ${this.role}`;
    }
}

class Reader extends UserBase {
    // role = 'READER' as const 
    role = Role.READER
    constructor(
        public firstName: string,
        public lastName: string,
        public email: string,
        public password: string,
        public contact?: Contact) {
            super(firstName, lastName, email, password, contact)
        }
        toString() {
            return `READER: ${super.toString()}`
        }
    
}
class Author extends UserBase {
    // role = 'READER' as const 
    role = Role.AUTHOR
    constructor(
        public firstName: string,
        public lastName: string,
        public email: string,
        public password: string,
        public contact?: Contact) {
            super(firstName, lastName, email, password, contact)
        }
        toString() {
            return `AUTHOR: ${super.toString()}`
        }
    
}
class Admin extends UserBase {
    // role = 'READER' as const 
    role = Role.ADMIN
    constructor(
        public firstName: string,
        public lastName: string,
        public email: string,
        public password: string,
        public contact?: Contact) {
            super(firstName, lastName, email, password, contact)
        }
        toString() {
            return `ADMIN: ${super.toString()}`
        }
}

import { IdType } from "../common/common-types.js";
import { Contact, Person } from "./person.js";

export interface User extends Person {
    id: IdType;
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
    public id: IdType = 0;
    role: Role = Role.READER;
    constructor(
        public firstName: string,
        public lastName: string,
        public email: string,
        public password: string,
        public contact?: Contact
    ) { }

    get salutation() {
        return `Hello ${this.firstName} ${this.lastName} in role [${this.role}]`
    }
    toString(): string {
        return `ID: ${this.id}, Name: ${this.firstName} ${this.lastName}, Email: ${this.email}, 
        Password: ${this.password}, Role: ${this.role}`;
    }
}

export type UserCreateDto = Omit<User, "id">;

export class Reader extends UserBase {
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
    public toString() {
        return `READER: ${super.toString()}`
    }

}
export class Author extends UserBase {
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
    public toString() {
        return `AUTHOR: ${super.toString()}`
    }

}
export class Admin extends UserBase {
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
    public toString() {
        return `ADMIN: ${super.toString()}`
    }
}

import { Contact, Person } from "./person.js";
import { IdType } from "../shared-types.js";

export interface User extends Person {
    password: string;
    roles: Role[];
    readonly salutation: string;
    toString(): string; // overriding
    // toString: () => string; // alternative
}


export enum Role {
    AUTHOR = 1, READER, ADMIN
}

export class UserBase implements User {
    id: IdType = undefined;
    constructor(
        public firstName: string,
        public lastName: string,
        public email: string,
        public password: string,
        public roles: Role[] = [Role.READER],
        public contact?: Contact
        ) {}
        get salutation() {
            return `Hello ${this.firstName} ${this.lastName} in roles: ${this.roles.map(role => Role[role]).join(', ')}`;
        }
        toString(): string {
            return `ID:${this.id}, ${this.salutation}`;
        }
}

export class Reader extends UserBase {
    constructor(
        public firstName: string,
        public lastName: string,
        public email: string,
        public password: string,
        public contact?: Contact
        ) {
            super( firstName, lastName, email, password, [Role.READER], contact);
        }
        toString(): string {
            return `READER: ${super.toString()}`
        }
}

export class Author extends UserBase {
    constructor(
        public firstName: string,
        public lastName: string,
        public email: string,
        public password: string,
        public contact?: Contact
        ) {
            super( firstName, lastName, email, password, [Role.AUTHOR], contact);
        }
        toString(): string {
            return `AUTHOR: ${super.toString()}`
        }
}

export class Admin extends UserBase {
    constructor(
        public firstName: string,
        public lastName: string,
        public email: string,
        public password: string,
        public contact?: Contact
        ) {
            super(firstName, lastName, email, password, [Role.ADMIN], contact);
        }
        toString(): string {
            return `ADMIN: ${super.toString()}`
        }
}
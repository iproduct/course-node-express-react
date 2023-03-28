import { Contact, NaturalPerson, Person } from "./person.js";

export interface User extends Person {
    username: string;
    password: string;
    roles: Role[];
}

export enum Role {
    Reader = 1, Author, Admin
}

export class UserBase extends NaturalPerson implements User {
    constructor(
        public id: number,
        public username: string,
        public password: string,
        public roles: Role[],
        public firstName: string,
        public lastName: string,
        public email: string,
        public contact?: Contact
    ) { 
        super(id, firstName, lastName, email, contact);
    }
    get greeting() {
        return `ID: ${this.id}, User: ${this.username} [${super.greeting}] in roles: [${this.roles.map(r => Role[r]).join(', ')}]`; 
    }
}

export class UserCreateDto {
    constructor(
        public username: string,
        public password: string,
        public roles: Role[],
        public firstName: string,
        public lastName: string,
        public email: string,
        public contact?: Contact 
    ){}
    get greeting() {
        return `User: ${this.username} [${this.firstName} ${this.lastName}] in roles: [${this.roles.map(r => Role[r]).join(', ')}]`; 
    }
}
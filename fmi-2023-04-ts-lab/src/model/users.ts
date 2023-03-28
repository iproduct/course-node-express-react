import { Contact, NaturalPerson, Person } from "./person.js";

export interface User extends Person {
    username: string;
    password: string;
    roles: Role[];
}

enum Role {
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
        public contact?: Contact | undefined
    ) { 
        super(id, firstName, lastName, email, contact);
    }
    get greeting() {
        return `User: ${this.username} [${super.greeting}] in Roles: ${this.roles.join(', ')}`; 
    }
}
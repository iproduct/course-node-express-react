import { IdType } from "../common-types.js";


export interface Person {
    id: IdType;
    firstName: string;
    lastName: string;
    email: string;
    contact?: Contact;
    readonly salutation: string;
}

export interface Contact {
    country: string;
    city?:string;
    address?: string;
    phone?: string;
}

export enum Role {
    Reader = 1, Author, Admin
}

export interface User extends Person{
    password: string;
    roles: Array<Role>; // Role[]
}

export class UserDto implements User {
    constructor(
        public id: number,
        public firstName: string,
        public lastName: string,
        public email: string,
        public password: string,
        public roles: Role[] = [Role.Reader],
        public contact?: Contact,
) {}
    get salutation() {
        return `${this.firstName} ${this.lastName} - ${this.email}, in Roles: [${this.roles.join(', ')}]`
    }
}


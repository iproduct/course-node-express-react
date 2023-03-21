import { IdType } from "../common-types.js";
import { Contact, Person } from "./person.js";

export interface User extends Person {
    role: Role;
    password: string;
    readonly salutation: string;
    toString(): string;
    // toString: () => string;
}

export type Role = 'ADMIN' | 'AUTHOR' | 'READER' | 'ANONYMOUS';

export enum Role2 {
    AUTHOR = 1, READER, ADMIN
}

export class UserBase implements User {
    id: IdType = undefined;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: Role = 'READER'; // disciminator property
    contact?: Contact;
    constructor(user: User);
    constructor(
        firstName: string,
        lastName: string,
        email: string,
        password: string,
        contact?: Contact | undefined
    );
    constructor(
        nameOrUser: string | User,
        lastName?: string,
        email?: string,
        password?: string,
        contact?: Contact | undefined
    ) {
        if (typeof nameOrUser === 'string') {
            this.firstName = nameOrUser;
            this.lastName = lastName || '';
            this.email = email || '';
            this.password = password || '';
            this.contact = contact;
        } else {
            this.id = nameOrUser.id;
            this.firstName = nameOrUser.firstName;
            this.lastName = nameOrUser.lastName;
            this.email = nameOrUser.email;
            this.password = nameOrUser.password;
            this.role = nameOrUser.role;
            this.contact = nameOrUser.contact;
        }
    }
    get salutation() {
        return `Hello ${this.firstName} ${this.lastName} in role: ${this.role}`;
    }
    toString(): string {
        return `ID: ${this.id}, Name: ${this.firstName} ${this.lastName}, Email: ${this.email}, Pasword: ${this.password}, Roles: role: ${this.role}`;
    }
}

export class Anonymous extends UserBase {
    readonly role = 'ANONYMOUS';
    constructor(
        firstName: string,
        lastName: string,
        email: string,
        password: string,
        public sessionTime: number,
        contact?: Contact | undefined
    ) {
        super(firstName, lastName, email, password, contact);
    }
    toString(): string {
        return `READER: ${super.toString()}`;
    }
}

export class Reader extends UserBase {
    role = 'READER' as const;
    constructor(
        firstName: string,
        lastName: string,
        email: string,
        password: string,
        public favouritePosts: string[],
        contact?: Contact | undefined
    ) {
        super(firstName, lastName, email, password, contact);
    }
    toString(): string {
        return `READER: ${super.toString()}`;
    }
}


export class Author extends UserBase {
    role = 'AUTHOR' as const;
    constructor(
        firstName: string,
        lastName: string,
        email: string,
        password: string,
        public ownPosts: string[],
        contact?: Contact | undefined
    ) {
        super(firstName, lastName, email, password, contact);
    }
    toString(): string {
        return `AUTHOR: ${super.toString()}`;
    }
}

export class Admin extends UserBase {
    readonly role = 'ADMIN' as const;
    constructor(
        firstName: string,
        lastName: string,
        email: string,
        password: string,
        public managedUsers: IdType[],
        contact?: Contact | undefined
    ) {
        super(firstName, lastName, email, password, contact);
    }
    toString(): string {
        return `ADMIN: ${super.toString()}`;
    }
}

export type UserType = Reader | Author | Admin | Anonymous;

// export function getExtraData(user: UserType) {
//     let extraData: string;
//     if(user instanceof Reader) {
//         extraData = user.favouritePosts.toString();
//     } else if(user instanceof Author){
//         extraData = user.ownPosts.toString();
//     } else if(user instanceof Admin){
//         extraData = user.managedUsers.toString();
//     } else {
//         throw new Error('Should not come here');
//     }
//     return extraData;
// }

export function getExtraData(user: UserType) {
    switch (user.role) {
        case 'READER':
            return user.favouritePosts.toString();
        case 'AUTHOR':
            return user.ownPosts.toString();
        case 'ADMIN':
            return user.managedUsers.toString();
        case 'ANONYMOUS':
            return user.sessionTime.toString();
        default:
            const _exhaustiveCheck: never = user;
            return _exhaustiveCheck;
    }
}

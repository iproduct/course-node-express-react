export const READER = 0;
export const AUTHOR = 1;
export const ADMIN =  2;

export const Role = ['READER', 'AUTHOR', 'ADMIN'];

export class User {
    constructor(firstName = '', lastName = '',  username = '', passwod = '', imageUrl = '', role =READER,  active = true) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.passwod = passwod;
        this.imageUrl = imageUrl;
        this.role = role;
        this.active = active;
    }
}
import { UserRepository } from './../dao/user-repository.js';
import { Optional } from "../common.js";
import { User } from "../model/users.js";

export interface Credentials {
    username: string;
    password: string;
}

export interface LoginService {
    login(username: string, password: string): Optional<User>;
    login(user: User): Optional<User>;
    logout(): void;
}

export class LoginServiceImpl implements LoginService {
    constructor(private userRepo: UserRepository) { }
    login(username: string, password: string): Optional<User>;
    login(user: User): Optional<User>;
    login(user: string | User, password?: string): Optional<User> {
        let credentials: Credentials;
        if (typeof user === 'string') {
            if(password) {
                credentials = {username: user, password};
            } else {
                credentials = {username: '', password: ''};
            }
        } else {
            credentials = {username: user.username, password: user.password}
        }
        const found = this.userRepo.findByUsername(credentials.username);
        if( found && found.password === credentials.password) {
            return found;
        } else {
            return undefined;
        }
    }
    logout(): void {
        throw new Error('Method not implemented.');
    }
}
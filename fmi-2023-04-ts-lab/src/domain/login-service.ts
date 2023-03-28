import { LoginService } from './login-service';
import { Optional } from "../common.js";
import { User } from "../model/users.js";

export interface LoginService{
    login(username: string, password: string): Optional<User>;
    login(user: User): Optional<User>;
    logout(): void;
}

export class LoginServiceImpl implements LoginService {
    login(username: string, password: string): Optional<User>;
    login(user: User): Optional<User>;
    login(user: string | User, password?: string): Optional<User> {
        
    }
    logout(): void {
        throw new Error('Method not implemented.');
    }
}
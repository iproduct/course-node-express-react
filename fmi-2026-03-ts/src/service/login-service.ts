import { Optional } from "../common-types";
import { User } from "../model/users";

export interface LoginService {
    login(email: string, pass: string): Optional<User>;
    login(user: User): Optional<User>;
    logout():undefined;
}
import { Optional } from "../../common-types";
import { UserRepository } from "../../dao/user-repository";
import { User } from "../../model/users";
import { LoginService } from "../login-service";

export class LoginServiceImpl implements LoginService {
    constructor(private userRepo: UserRepository) {}
    login(email: string | User, pass?: string ): Optional<User> {
        let mail: string;
        let password: string;
        if (typeof email === "string") {
            mail = email;
            password = pass ? pass: "";
        } else {
            mail = email.email;
            password = email.password;
        }
        const user = this.userRepo.findByEmail(mail);
        if(user && user.password === password) {
            return user;
        }
    }
    logout(): undefined {
        throw new Error("Method not implemented.");
    }

}
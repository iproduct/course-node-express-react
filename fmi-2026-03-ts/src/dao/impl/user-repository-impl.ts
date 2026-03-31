import { Optional } from "../../common-types";
import { User } from "../../model/users";
import { UserRepository } from "../user-repository";
import { RepositoryInMemmory } from "./repository-in-memory";

export class UserRepositoryImpl extends RepositoryInMemmory<User> implements UserRepository {
    findByEmail(email: string): Optional<User> {
        return this.findAll().find(u => u.email === email);
    }
    
}
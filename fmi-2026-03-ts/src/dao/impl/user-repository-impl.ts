import { Optional } from "../../common-types.js";
import { User } from "../../model/users.js";
import { UserRepository } from "../user-repository.js";
import { RepositoryInMemmory } from "./repository-in-memory.js";

export class UserRepositoryImpl extends RepositoryInMemmory<User> implements UserRepository {
    findByEmail(email: string): Optional<User> {
        return this.findAll().find(u => u.email === email);
    }
    
}
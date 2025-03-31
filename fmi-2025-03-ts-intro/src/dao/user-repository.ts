import { Repository, RepositoryInMemory } from "./repository.js";
import { User } from "../model/user.js";
import { Optional } from "../common/common-types.js";

export interface UserRepository extends Repository<User> {
    findByEmail(email: string): Optional<User>
}

export class UserRepositoryInMemory extends RepositoryInMemory<User> implements UserRepository {
    findByEmail(email: string): Optional<User> {
        return this.findAll().find(user => user.email === email)
    }
}
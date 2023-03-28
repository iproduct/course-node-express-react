import { Optional } from "../common.js";
import { User } from "../model/users.js";
import { Repository, RepositoryImpl } from "./repository.js";

export interface UserRepository extends Repository<User> {
    findByUsername(username: string): Optional<User>;
}

export class UserRepositoryImpl extends RepositoryImpl<User> implements UserRepository {
    findByUsername(username: string): Optional<User> {
        return this.findAll().find(u => u.username === username);
    }
}
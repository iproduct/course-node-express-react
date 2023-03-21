import { User } from "../model/users.js";
import { Repository, RepositoryMemoryImpl } from "./repository.js";

export interface UserRepository extends Repository<User> {
    findByEmail(email: string): User | undefined;
}

export class UserRepositoryMemoryImpl extends RepositoryMemoryImpl<User> implements UserRepository {
    findByEmail(email: string): User | undefined {
        return this.findAll().find(user => user.email === email);
    }
}
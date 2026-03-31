import { Optional } from "../common-types";
import { User } from "../model/users";
import { Repository } from "./repository";

export interface UserRepository extends Repository<User> {
    findByEmail(email: string): Optional<User>;
}
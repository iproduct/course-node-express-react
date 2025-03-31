import { RepositoryInMemory } from "./repository.js";
export class UserRepositoryInMemory extends RepositoryInMemory {
    findByEmail(email) {
        return this.findAll().find(user => user.email === email);
    }
}

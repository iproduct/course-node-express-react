import { RepositoryInMemmory } from "./repository-in-memory.js";
export class UserRepositoryImpl extends RepositoryInMemmory {
    findByEmail(email) {
        return this.findAll().find(u => u.email === email);
    }
}
//# sourceMappingURL=user-repository-impl.js.map
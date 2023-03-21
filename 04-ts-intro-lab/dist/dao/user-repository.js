import { RepositoryMemoryImpl } from "./repository.js";
export class UserRepositoryMemoryImpl extends RepositoryMemoryImpl {
    findByEmail(email) {
        return this.findAll().find(user => user.email === email);
    }
}
//# sourceMappingURL=user-repository.js.map
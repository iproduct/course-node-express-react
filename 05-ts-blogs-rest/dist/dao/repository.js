export class RepositoryImpl {
    constructor(idGenerator) {
        this.idGenerator = idGenerator;
        this.entities = new Map();
    }
    findAll() {
        return Array.from(this.entities.values());
    }
    findById(id) {
        return this.entities.get(id);
    }
    create(entity) {
        entity.id = this.idGenerator.getNextId();
        this.entities.set(entity.id, entity);
        return entity;
    }
    update(entity) {
        const old = this.findById(entity.id);
        if (old === undefined) {
            throw new Error(`Entity with ID='${entity.id}' does not exist.`);
        }
        this.entities.set(entity.id, entity);
        return entity;
    }
    deleteById(id) {
        const old = this.findById(id);
        if (old === undefined) {
            throw new Error(`Entity with ID='${id}' does not exist.`);
        }
        this.entities.delete(id);
        return old;
    }
    count() {
        return this.entities.size;
    }
}
//# sourceMappingURL=repository.js.map
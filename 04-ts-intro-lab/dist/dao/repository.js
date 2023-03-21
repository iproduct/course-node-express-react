export class RepositoryMemoryImpl {
    constructor(idGenerator) {
        this.idGenerator = idGenerator;
        this.entites = new Map();
    }
    findAll() {
        return Array.from(this.entites.values());
    }
    findById(id) {
        return this.entites.get(id);
    }
    create(entity) {
        entity.id = this.idGenerator.getNextId();
        this.entites.set(entity.id, entity);
        return entity;
    }
    update(entity) {
        const found = this.findById(entity.id);
        if (!found)
            throw new Error(`Entity with ID=${entity.id} does not exist`);
        this.entites.set(entity.id, entity);
        return entity;
    }
    deleteById(id) {
        const deleted = this.findById(id);
        if (!deleted)
            throw new Error(`Entity with ID=${id} does not exist`);
        this.entites.delete(id);
        return deleted;
    }
    count() {
        return this.entites.size;
    }
}
//# sourceMappingURL=repository.js.map
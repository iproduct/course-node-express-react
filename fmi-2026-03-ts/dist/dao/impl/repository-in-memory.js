export class RepositoryInMemmory {
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
    create(entityDto) {
        const resultEntity = entityDto;
        resultEntity.id = this.idGenerator.getNextId();
        this.entities.set(resultEntity.id, resultEntity);
        return resultEntity;
    }
    update(entity) {
        if (this.entities.get(entity.id)) {
            this.entities.set(entity.id, entity);
            return entity;
        }
    }
    deleteById(id) {
        const deleted = this.entities.get(id);
        this.entities.delete(id);
        return deleted;
    }
    get size() {
        return this.entities.size;
    }
}
//# sourceMappingURL=repository-in-memory.js.map
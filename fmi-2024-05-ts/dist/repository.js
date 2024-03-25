export class IdGeneratorNumber {
    constructor() {
        this.nextId = 0;
    }
    getNextId() {
        return ++this.nextId;
    }
}
export class RepositoryInMemory {
    constructor(idGen) {
        this.idGen = idGen;
        this.entities = new Map();
    }
    findAll() {
        return Array.from(this.entities.values());
    }
    findById(id) {
        return this.entities.get(id);
    }
    create(entity) {
        const result = entity;
        result.id = this.idGen.getNextId();
        this.entities.set(result.id, result);
        return result;
    }
    update(entity) {
        const exisitng = this.findById(entity.id);
        if (exisitng) {
            this.entities.set(entity.id, entity);
            return entity;
        }
        return undefined;
    }
    deleteById(id) {
        const exisitng = this.findById(id);
        if (exisitng) {
            this.entities.delete(id);
            return exisitng;
        }
        return undefined;
    }
    get size() {
        return this.entities.size;
    }
}
//# sourceMappingURL=repository.js.map
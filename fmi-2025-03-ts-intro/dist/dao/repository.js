export class RepositoryInMemory {
    constructor(idGen) {
        this.idGen = idGen;
        this.entities = new Map;
    }
    findAll() {
        // return Object.keys(this.entities).map(k => this.entities[(k as unknown as number)])
        return Array.from(this.entities.values());
    }
    findById(id) {
        return this.entities.get(id);
    }
    create(dto) {
        const id = this.idGen.getNextId();
        const entity = Object.assign({ id }, dto);
        this.entities.set(id, entity);
        return entity;
    }
    update(entity) {
        const old = this.findById(entity.id);
        if (old) {
            this.entities.set(entity.id, entity);
            return entity;
        }
        return undefined;
    }
    deleteById(id) {
        const old = this.findById(id);
        if (this.entities.delete(id)) {
            return old;
        }
        return undefined;
    }
    count() {
        return this.entities.size;
    }
}

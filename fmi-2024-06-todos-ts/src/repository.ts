import { Identifiable } from "./shared-types.js";

export interface IdGenerator<K> {
    getNextId(): K;
}

export class IdGeneratorNumber implements IdGenerator<number> {
    private nextId = 0;
    getNextId(): number {
        return ++this.nextId;
    }
}

export interface Repository<K, V extends Identifiable<K>> {
    findAll(): Promise<V[]>;
    findById(id: K): Promise<V>;
    create(entity: Omit<V, "id">): Promise<V>;
    update(entity: V): Promise<V>;
    deleteById(id: K): Promise<V>;
    readonly size: Promise<number>;
}

export class RepositoryInMemory<K, V extends Identifiable<K>> implements Repository<K, V> {
    private entities = new Map<K, V>();
    constructor(private idGen: IdGenerator<K>) { }
    async findAll() {
        return Array.from(this.entities.values());
    }
    async findById(id: K) {
        const found = this.entities.get(id);
        if (found) {
            return found;
        }
        throw new Error(`Entity with ID='${id}' not found.`);
    }

    async create(entity: Omit<V, 'id'>) {
        const result = entity as V;
        result.id = this.idGen.getNextId();
        this.entities.set(result.id, result);
        return result;
    }
    async update(entity: V) {
        await this.findById(entity.id);
        this.entities.set(entity.id, entity);
        return entity;
    }
    async deleteById(id: K) {
        const exisitng = await this.findById(id);
        this.entities.delete(id);
        return exisitng;
    }
    get size() {
        return Promise.resolve(this.entities.size);
    }
}
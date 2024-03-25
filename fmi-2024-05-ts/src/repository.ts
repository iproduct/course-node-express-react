import { Identifiable, Optional } from "./shared-types.js";

export interface IdGenerator<K> {
    getNextId(): K;
}

export class IdGeneratorNumber implements IdGenerator<number>{
    private  nextId = 0;
    getNextId(): number {
        return ++this.nextId;
    }
}

export interface Repository<K, V extends Identifiable<K>>{
    findAll(): V[];
    findById(id: K): Optional<V>;
    create(entity: Omit<V, "id">): V;
    update(entity: V): Optional<V>;
    deleteById(id: K): Optional<V>;
    readonly size: number;
}

export class RepositoryInMemory<K, V extends Identifiable<K>> implements Repository<K, V> {
    private entities = new Map<K, V>();
    constructor(private idGen: IdGenerator<K>){}
    findAll(): V[] {
        return Array.from(this.entities.values());
    }
    findById(id: K): Optional<V> {
        return this.entities.get(id);
    }
    create(entity: Omit<V, 'id'>): V {
        const result = entity as V;
        result.id = this.idGen.getNextId();
        this.entities.set(result.id, result);
        return result;
    }
    update(entity: V): Optional<V> {
        const exisitng = this.findById(entity.id);
        if(exisitng) {
            this.entities.set(entity.id, entity);
            return entity;
        }
        return undefined;
    }
    deleteById(id: K): Optional<V> {
        const exisitng = this.findById(id);
        if(exisitng) {
            this.entities.delete(id);
            return exisitng;
        }
        return undefined;
    }
    get size() {
        return this.entities.size;
    }
}
import { IdType, Identifiable, Optional } from "../common.js";

export interface Repository<T extends Identifiable> {
    findAll(): T[];
    findById(id: IdType): Optional<T>;
    create(entity: Omit<T, "id">): T;
    update(entity: T): T;
    deleteById(id: IdType): Optional<T>;
    count(): number;
}

export interface IdGenerator<K> {
    getNextId(): K;
}

export class NumberIdGenerator implements IdGenerator<number>{
    private nextId = 0;
    getNextId(): number {
        return ++this.nextId;
    }
}

export class RepositoryImpl<T extends Identifiable> implements Repository<T> {
    constructor(private idGen: IdGenerator<IdType>) { }
    private entities = new Map<IdType, T>();
    findAll(): T[] {
        return Array.from(this.entities.values());
    }
    findById(id: IdType): Optional<T> {
        return this.entities.get(id);
    }
    create(entityCreateDto: Omit<T, "id">): T {
        const entity = { id: this.idGen.getNextId(), ...entityCreateDto} as T;
        this.entities.set(entity.id, entity);
        return entity;
    }
    update(entity: T): T {
        this.entities.set(entity.id, entity);
        return entity;
    }
    deleteById(id: IdType): Optional<T> {
        const deleted = this.entities.get(id);
        this.entities.delete(id);
        return deleted;
    }
    count(): number {
        return this.entities.size;
    }
}
import { IdGenerator } from './id-generator.js';
import { Identifiable, IdType } from "../common-types.js";

export interface Repository<T extends Identifiable> {
    findAll(): T[];
    findById(id: IdType): T | undefined;
    create(entity: T): T;
    update(entity: T): T;
    deleteById(id: IdType): T;
    count(): number;
}

export class RepositoryMemoryImpl<T extends Identifiable> implements Repository<T>{
    private entites = new Map<IdType, T>();

    constructor(private idGenerator: IdGenerator<IdType>) {}

    findAll(): T[] {
        return Array.from(this.entites.values());
    }
    findById(id: IdType): T | undefined {
        return this.entites.get(id);
    }
    create(entity: T): T {
        entity.id = this.idGenerator.getNextId();
        this.entites.set(entity.id, entity);
        return entity;
    }
    update(entity: T): T {
        const found = this.findById(entity.id);
        if(!found) throw new Error(`Entity with ID=${entity.id} does not exist`);
        this.entites.set(entity.id, entity);
        return entity;
    }
    deleteById(id: IdType): T {
        const deleted = this.findById(id);
        if(!deleted) throw new Error(`Entity with ID=${id} does not exist`);
        this.entites.delete(id);
        return deleted;
    }
    count(): number {
        return this.entites.size;
    }

}

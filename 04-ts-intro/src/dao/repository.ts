import { IdGenerator } from './id-generator.js';
import { Identifiable, IdType } from "../shared-types.js";

export interface Repository<T extends Identifiable> {
    findAll(): T[];
    findById(id: IdType): T | undefined;
    create(entity: T): T;
    update(entity: T): T;
    deleteById(id: IdType): T;
    count(): number;
}

export class RepositoryImpl<T extends Identifiable> implements Repository<T> {
    private entities = new Map<IdType, T>();

    constructor(private idGenerator: IdGenerator<IdType>) { } // Constructor DI

    findAll(): T[] {
        return Array.from(this.entities.values());
    }
    findById(id: IdType): T | undefined {
        return this.entities.get(id);
    }
    create(entity: T): T {
        entity.id = this.idGenerator.getNextId(); // assign unique id
        this.entities.set(entity.id, entity);
        return entity;
    }
    update(entity: T): T {
        const old = this.findById(entity.id);
        if (old === undefined) {
            throw new Error(`Entity with ID='${entity.id}' does not exist.`);
        }
        this.entities.set(entity.id, entity);
        return entity;
    }
    deleteById(id: number): T {
        const old = this.findById(id);
        if (old === undefined) {
            throw new Error(`Entity with ID='${id}' does not exist.`);
        }
        this.entities.delete(id);
        return old;
    }
    count(): number {
        return this.entities.size;
    }

}

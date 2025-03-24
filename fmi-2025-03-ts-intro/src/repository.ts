import { Identifiable, IdType, Optional } from "./common-types";

export interface Repository<T extends Identifiable> {
    findAll(): T[];
    findById(id: IdType): Optional<T>;
    create(entity: Omit<T, 'id'>): T;
    update(entity: T): Optional<T>;
    deleteById(id: IdType): Optional<T>;
    count(): number;
}

export class RepositoryInMemory<T extends Identifiable> implements Repository<T> {
    private entities = new Map<IdType, T>;
    findAll(): T[] {
        return Array.from(this.entities.values());
    }
    findById(id: IdType): Optional<T> {
        return this.entities.get(id);
    }
    create(entity: T): T {
        throw new Error("Method not implemented.");
    }
    update(entity: T): Optional<T> {
        throw new Error("Method not implemented.");
    }
    deleteById(id: IdType): Optional<T> {
        throw new Error("Method not implemented.");
    }
    count(): number {
        throw new Error("Method not implemented.");
    }
    
}
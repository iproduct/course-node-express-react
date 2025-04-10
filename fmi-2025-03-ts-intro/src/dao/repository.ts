import { Identifiable, IdType, Optional } from "../common/common-types.js";
import { IdGenerator } from "../util/idgen.js";

export interface Repository<T extends Identifiable> {
    findAll(): T[];
    findById(id: IdType): Optional<T>;
    create(entity: Omit<T, 'id'>): T;
    update(entity: T): Optional<T>;
    deleteById(id: IdType): Optional<T>;
    count(): number;
}

// interface EntityMap<V> {
//     [key: IdType] : V;
// }

export type EntityCreateDto<T> = Omit<T, "id">

export class RepositoryInMemory<T extends Identifiable> implements Repository<T> {
    private entities = new Map<IdType, T>;
    constructor(private idGen: IdGenerator<IdType>){}
    findAll(): T[] {
        // return Object.keys(this.entities).map(k => this.entities[(k as unknown as number)])
        return Array.from(this.entities.values());
    }
    findById(id: IdType): Optional<T> {
        return this.entities.get(id);
    }
    create(dto: EntityCreateDto<T>): T {
        const id = this.idGen.getNextId();
        const entity = Object.assign(dto, {id}) as T;
        this.entities.set(id, entity)
        return entity;
    }
    update(entity: T): Optional<T> {
        const old = this.findById(entity.id);
        if(old) {
            this.entities.set(entity.id, entity)
            return entity
        }
        return undefined;
    }
    deleteById(id: IdType): Optional<T> {
        const old = this.findById(id);
        if(this.entities.delete(id)) {
            return old
        }
        return undefined;
    }
    count(): number {
        return this.entities.size;
    }
    
}
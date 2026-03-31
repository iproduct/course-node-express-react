import { Identifiable, IdType, Optional } from "../../common-types";
import { IdGenerator } from "../id-generator";
import { Repository } from "../repository";

export class RepositoryInMemmory<V extends Identifiable<IdType>> implements Repository<V> {
    private entities =  new Map<IdType, V>();
    constructor(private idGenerator: IdGenerator<IdType>) {}
    findAll(): V[] {
        return Array.from(this.entities.values());
    }
    findById(id: IdType): Optional<V> {
        return this.entities.get(id);
    }
    create(entityDto: Omit<V, "id">): V {
        const resultEntity: V = entityDto as V;
        resultEntity.id = this.idGenerator.getNextId();
        this.entities.set(resultEntity.id, resultEntity);
        return resultEntity;
    }
    update(entity: V): Optional<V> {
        throw new Error("Method not implemented.");
    }
    deleteById(id: IdType): Optional<V> {
        throw new Error("Method not implemented.");
    }
    get size() {
        return this.entities.size;
    }
    
}
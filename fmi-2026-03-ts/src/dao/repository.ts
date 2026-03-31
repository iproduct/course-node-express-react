import { Identifiable, IdType, Optional } from "../common-types.js";

export interface Repository<V extends Identifiable<IdType>> {
    findAll(): V[];
    findById(id: IdType): Optional<V>;
    create(entityDto: Omit<V, "id">): V;
    update(entity:V): Optional<V>;
    deleteById(id: IdType): Optional<V>;
    readonly size: number;
}
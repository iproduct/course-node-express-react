
export type IdType = string

export interface Identifiable {
    id: IdType;
}

export interface Repository<T extends Identifiable> {
    create(entity: T): Promise<T>;
    update(entity: T): Promise<T>;
    deleteById(id: IdType): Promise<T>;
    findAll(): Promise<T[]>;
    findById(id: IdType): Promise<T>;
    count(): Promise<number>;
}

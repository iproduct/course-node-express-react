import { Item } from './book-models.js';

export type IdType = string

export interface Indentifiable<K> {
    id: K | undefined
}

export type IdGenerator<K> = Iterable<K>

export interface Repository<K, V> {
    findAll(): V[];
    findById(id: K): V | undefined;
    create(item: V): V;
    addAll(item: V[]): void;
    clear():void;
    update(item: V): V;
    deleteById(id: K): V | undefined;
    count(): number;
}

export interface ItemRepository extends Repository<IdType, Item> {
    findByNamePart(namePart: string): Item | undefined;
}

export class InMemoryRepository<K, V extends Indentifiable<K>> implements Repository<K, V> {
    private entities = new Map<K, V>();
    private sequence: Iterator<K> | undefined;
    constructor(idGen?: IdGenerator<K>, sampleValues?: V[]) {
        if (idGen) {
            this.sequence = idGen[Symbol.iterator]()
        }
        if (sampleValues) {
            sampleValues.forEach(val => this.create(val))
        }
    }
     findAll(): V[] {
        return Array.from(this.entities.values());
    }
    findById(id: K): V | undefined {
        return this.entities.get(id);
    }
    create(item: V): V {
        if (this.sequence) {
            item.id = this.sequence.next().value;
        }
        this.entities.set(item.id!, item);
        return item;
    }
    addAll(item: V[]): void {
        item.forEach(this.create, this)
    }
    clear(): void {
        this.entities.clear();
    }

    update(item: V): V {
        if (!item.id) {
            throw new Error(`Item ID should be defined.`);
        }
        this.entities.set(item.id, item);
        return item;
    }
    deleteById(id: K): V | undefined {
        const deleted = this.findById(id);
        if (deleted) {
            this.entities.delete(id);
        }
        return deleted;
    }
    count(): number {
        return this.entities.size;
    }

}

export class InMemoryItemRepository extends InMemoryRepository<IdType, Item> implements ItemRepository {
    findByNamePart(namePart: string): Item | undefined {
        return this.findAll().find(u => u.volumeInfo.title.includes(namePart));
    }
}
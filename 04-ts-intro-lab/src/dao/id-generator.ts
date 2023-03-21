export interface IdGenerator<K> {
    getNextId(): K;
}

export class NumberIdGenerator implements IdGenerator<number> {
    private nextId = 0;
    getNextId(): number {
        return ++ this.nextId;
    }
}
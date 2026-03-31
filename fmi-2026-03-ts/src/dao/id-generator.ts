export interface IdGenerator<K> {
    getNextId(): K;
}
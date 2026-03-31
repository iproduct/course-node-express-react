export type IdType = number;

export type Optional<T> = T | undefined;

export interface Identifiable<K> {
    id: K;
}
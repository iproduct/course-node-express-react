export type IdType = number;

export interface Identifiable<K> {
    id: K;
}

export type Optional<V> = V | undefined;
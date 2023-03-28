export type IdType = number;

export interface Identifiable {
    id: IdType;
}

export type Optional<T> = T | undefined;
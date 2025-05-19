export type IdType = string

export interface Identifiable {
    id: IdType
}

export interface EntityConstructor<V> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    new (...args: any): V
    className: string;
}
import { Post, PostCreateDTO, PostStatus } from "../model/post";

export type Partial<T> = {
    [K in keyof T]?: T[K]
}

export type Optional<T> = T | undefined;

export type IdType = number;

export interface Identifiable<K> {
    id: K;
}

export interface PostListener {
    (post: Post | PostCreateDTO) : void;
}

export interface PostUdateListener {
    (post: Post) : void;
}

export type FilterType = PostStatus | undefined;

export type FilterChangeListener = (filterChange: FilterType) => void
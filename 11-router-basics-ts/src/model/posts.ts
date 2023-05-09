import { IdType } from "./shared-types.js";

export enum PostStatus {
    Published = 1, Draft, Outdated
}

export type FilterType = PostStatus | undefined;

export class PostCreateDto {
    constructor(
        public title: string,
        public content: string,
        public tags: string[],
        public imageUrl: string,
        public status: PostStatus,
        public favorite: boolean,
        public authorId: IdType,
    ) { }
}

export class Post extends PostCreateDto{
    constructor(
        public id: IdType | undefined,
        title: string,
        content: string,
        tags: string[],
        imageUrl: string,
        status: PostStatus = PostStatus.Published,
        favorite = false,
        authorId: IdType = 1
    ) {
        super(title, content, tags, imageUrl, status, favorite, authorId);
    }
}
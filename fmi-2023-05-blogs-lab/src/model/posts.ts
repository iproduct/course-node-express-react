import { IdType, Identifiable } from "../common-types";

export class Post implements Identifiable{
    constructor(
        public id: IdType,
        public title: string,
        public content: string,
        public authorId: IdType,
        public tags: string[],
        public imageUrl: string,
        public active = true
    ) { }
}

export class PostCreateDto implements Omit<Post, "id">{
    constructor(
        public title: string,
        public content: string,
        public authorId: IdType,
        public tags: string[],
        public imageUrl: string,
        public active = true
    ) { }
}
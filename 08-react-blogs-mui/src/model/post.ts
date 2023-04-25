import { Identifiable, IdType } from "../shared/common-types";

export enum PostStatus {
    Published = 1, Draft, Expired
}

export class Post implements Identifiable<IdType> {
    constructor(
        public id: IdType,
        public title: string,
        public content: string,
        public imageUrl: string,
        public authorId: IdType,
        public tags: string[],
        public likeCounter: number = 0,
        public status: PostStatus = PostStatus.Published
    ) { }
}


export class PostCreateDTO implements Omit<Post, 'id'>{
    constructor(
        public title: string,
        public content: string,
        public imageUrl: string,
        public authorId: IdType,
        public tags: string[],
        public likeCounter: number = 0,
        public status: PostStatus = PostStatus.Published
    ) { }
}

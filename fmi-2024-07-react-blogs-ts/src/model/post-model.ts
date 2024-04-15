import { IdType } from "../shared/shared-types";

export enum PostStatus{
    Publised = 1, Created, Archived
}

export class PostCreateDto {
    constructor(
        public title: string, 
        public content: string, 
        public authorId: IdType,
        tags: string[],
        imageUrl: string,
        public status: PostStatus =PostStatus.Publised,
    ) {}
}

export class Post extends PostCreateDto{
    static className = 'Post';
    public id: IdType = 0;
}

export type PostFilterType = PostStatus | undefined;
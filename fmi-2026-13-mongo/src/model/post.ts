import { ObjectId } from "mongodb";

export class Post {
    constructor(
        public title: string,
        public content: string,
        public authorId: ObjectId,
        public imageUrl: string,
        public tags: string[],
        public categories?: string[],
        public id?: ObjectId,
    ) { }
}
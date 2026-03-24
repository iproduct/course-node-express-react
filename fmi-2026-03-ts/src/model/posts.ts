import { IdType } from "../common-types";

export class Post {
    constructor(
        public id: IdType,
        public title: string,
        public content: string,
        public keywords: string[],
        public pictureUrl?: string
    ) {}
}
export class Post {
    constructor(
        public id: string,
        public title: string,
        public content: string,
        public authorId: string,
        public imageUrl: string,
        public tags: string[],
        public categories: string[],
        public created: Date,
        public modified: Date,
    ) { }
}
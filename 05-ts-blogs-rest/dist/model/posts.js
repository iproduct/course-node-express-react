export class PostCreateDto {
    constructor(title, content, tags, imageUrl, authorId) {
        this.title = title;
        this.content = content;
        this.tags = tags;
        this.imageUrl = imageUrl;
        this.authorId = authorId;
    }
}
export class Post extends PostCreateDto {
    constructor(id, title, content, tags, imageUrl, authorId) {
        super(title, content, tags, imageUrl, authorId);
        this.id = id;
    }
}
//# sourceMappingURL=posts.js.map
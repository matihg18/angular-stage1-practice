export class Post{
    user: string;
    published: Date;
    content: string;

    constructor(user: string, published: Date, content: string) {
        this.user = user;
        this.published = published;
        this.content = content;
    }
}
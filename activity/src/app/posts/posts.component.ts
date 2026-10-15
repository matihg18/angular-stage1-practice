import {Component, Input, OnInit} from "@angular/core";

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

@Component({
    selector: 'post-component',
    templateUrl: './posts.component.html',
    styleUrls: ['./posts.component.css']
})
export class PostComponent implements OnInit {
    @Input() post: Post;

    constructor(){}

    ngOnInit(){}
}
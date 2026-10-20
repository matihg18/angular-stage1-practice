import {Component, Input, OnInit} from "@angular/core";
import {Post} from '../post';
import {Observable} from 'rxjs';
import {PostService} from '../post.service';

@Component({
    selector: 'post-component-smart',
    standalone: false,
    templateUrl: './posts.component.smart.html',
    styleUrls: ['./posts.component.smart.css']
}) export class PostComponentSmart implements OnInit {

    public posts$!: Observable<Post[]>;

    constructor(private postService: PostService){}

    ngOnInit(){
        this.posts$ = this.postService.allPosts$;
        this.postService.loadPosts();
    }
}
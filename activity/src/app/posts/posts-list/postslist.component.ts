import {Component, Input, OnInit, ChangeDetectionStrategy, Injectable } from "@angular/core";
import {Post} from "../post"
import { ComponentStore } from "@ngrx/component-store";

export interface PostListComponentState {
    posts: Post[]
}

@Injectable() 
export class PostListComponentStore extends ComponentStore<PostListComponentState>{
    readonly vm$ = this.select((state) => ({posts: state.posts}));

    constructor(){
        super({
            posts: []
        })
    }
    readonly setPosts = this.updater((state, postList: Post[]) => ({...state,posts: postList}));
}


@Component({
    selector: 'post-list-component',
    standalone: false,
    templateUrl: './postslist.component.html',
    styleUrls: ['./postslist.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [PostListComponentStore]
})
export class PostListComponent implements OnInit {
    @Input() set posts(postList: Post[]){
        this.store.setPosts(postList)
    };

    constructor(readonly store: PostListComponentStore){}

    ngOnInit(){
    }
}
import {Component, Input, OnInit, ChangeDetectionStrategy, Injectable, input } from "@angular/core";
import {Post} from "../post"
import { ComponentStore } from "@ngrx/component-store";
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";
import { PostComponentDumb } from "./posts.component.dumb";

import { MatButtonModule } from "@angular/material/button";

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
    templateUrl: './postslist.component.html',
    styleUrls: ['./postslist.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [PostListComponentStore],
    imports: [CommonModule, RouterLink, PostComponentDumb, MatButtonModule]
})
export class PostListComponent implements OnInit {

    posts = input.required<Post[]>();

    constructor(readonly store: PostListComponentStore){}

    ngOnInit(){
      this.store.setPosts(this.posts())
    }
}

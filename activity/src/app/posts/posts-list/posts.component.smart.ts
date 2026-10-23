import {Component, Injectable, Input, OnInit} from "@angular/core";
import {Post} from '../post';
import { ComponentStore } from "@ngrx/component-store";
import { PostService } from "../post.service";
import { exhaustMap, switchMap } from "rxjs";
import { tapResponse } from '@ngrx/operators';
import { CommonModule } from "@angular/common";
import { PostListComponent } from "./postslist.component";

export interface SmartComponentState{
    posts: Post[],
    error: string
}

@Injectable()
export class SmartComponentStore extends ComponentStore<SmartComponentState>{
    readonly vm$ = this.select((state) => ({posts: state.posts}));
    constructor(private postService: PostService){
        super({
            posts: [],
            error: ""
        })
    }

    readonly setPosts = this.updater((state, postList: Post[]) => ({...state,posts: postList}));
    readonly setError = this.updater((state, err: string) => ({...state, error: err}));

    readonly getPosts = this.effect<void>(
        (trigger$) => trigger$.pipe(
            switchMap(() => 
                this.postService.getAllPosts().pipe(
                    tapResponse({next: (posts) => this.setPosts(posts),
                        error: (err) => this.setError('Couldnt load the posts'),
                    })
                )
            )
        )
    )
}


@Component({
    selector: 'post-component-smart',
    templateUrl: './posts.component.smart.html',
    styleUrls: ['./posts.component.smart.css'],
    providers: [SmartComponentStore],
    imports: [CommonModule, PostListComponent]
}) export class PostComponentSmart implements OnInit {

    constructor(private store: SmartComponentStore){};

    ngOnInit(){
        this.store.getPosts();
    };
}
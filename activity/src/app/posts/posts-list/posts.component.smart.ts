import {Component, Input, OnInit} from "@angular/core";
import {Post} from '../post';
import {Observable} from 'rxjs';
import { Store } from '@ngrx/store';
import { getPosts, getPostsLoaded } from '../state/posts.selectors';
import { loadPostsRequested } from '../state/posts.actions';

@Component({
    selector: 'post-component-smart',
    standalone: false,
    templateUrl: './posts.component.smart.html',
    styleUrls: ['./posts.component.smart.css']
}) export class PostComponentSmart implements OnInit {

    public posts$: Observable<Post[]>;
    private postsLoaded$: Observable<boolean>;

    constructor(private store: Store){
        this.posts$ = this.store.select(getPosts);
        this.postsLoaded$ = this.store.select(getPostsLoaded);
    };

    ngOnInit(){
        this.store.dispatch(loadPostsRequested());
    };
}
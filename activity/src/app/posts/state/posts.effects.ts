import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { PostService } from '../post.service';
import { loadPostsRequested, loadPostsSuccess, getPostByIdRequested, getPostByIdSuccess, getPostByIdFailure, updatePostRequested, updatePostSuccess, updatePostFailure, createPostRequested, createPostSuccess, createPostFailure } from './posts.actions'


@Injectable()
export class PostEffects {
    private actions$ = inject(Actions);
    private postService = inject(PostService);

    loadPosts$ = createEffect(() => this.actions$.pipe(
        ofType(loadPostsRequested),
        switchMap(() => this.postService.getAllPosts().pipe(
            map(posts => loadPostsSuccess({posts}))
        ))
    ));
    getPost$ = createEffect(() => this.actions$.pipe(
        ofType(getPostByIdRequested),
        switchMap(({id}) => this.postService.getPostById(id).pipe(
            map(post => post ? getPostByIdSuccess({post}) : getPostByIdFailure({error: "post ${id} not found"})
        ))
    )));
    updatePost$ = createEffect(() => this.actions$.pipe(
        ofType(updatePostRequested),
        switchMap(({id, changes}) => this.postService.updatePost(id, changes).pipe(
            map(post => post ? updatePostSuccess({post}) : updatePostFailure({error: "the post coudl'nt been updated"}))
        ))
    ));
    createPost$ = createEffect(() => this.actions$.pipe(
        ofType(createPostRequested),
        switchMap(({post}) => this.postService.addPost(post).pipe(
            map(post => post ? createPostSuccess({post}) : createPostFailure({error: "the new post could'nt been created"}))
        ))
    ))

    constructor() {};
}
import { Component, Injectable, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {Post} from '../post';
import {Router, ActivatedRoute} from '@angular/router';
import { Observable, switchMap, filter, tap } from 'rxjs';
import { ComponentStore } from '@ngrx/component-store';
import { PostService } from '../post.service';
import { tapResponse } from '@ngrx/operators';

export interface FormComponentState {
    idEditingPost: number | null,
    post: Post | null,
    error: string
}

@Injectable()
export class FormComponentStore extends ComponentStore<FormComponentState>{
    readonly idEditingPost$: Observable<number | null> = this.select((state) => state.idEditingPost); 
    readonly post$: Observable<Post | null> = this.select((state) => state.post);

    constructor(private postService: PostService){
        super({
            idEditingPost: null,
            post: null,
            error: ""
        })
    }

    readonly setIdEditingPost = this.updater((state, id: number) => ({...state,idEditingPost: id}));
    readonly setPost = this.updater((state, post: Post | null) => ({...state, post: post}));
    readonly setError = this.updater((state, err: string) => ({...state, error: err}));

    readonly getPostById = this.effect((postId$: Observable<number | null>) => {
        return postId$.pipe(
            filter((id): id is number => id !== null),
            switchMap((id) =>
                this.postService.getPostById(id).pipe(
                    tapResponse({
                        next: (post) => this.setPost(post ?? null),
                        error: (err) => this.setError('Couldnt get the post')
                    })
                )
            )
        )
    })

    readonly addPost = this.effect((post$: Observable<Post>) =>{
        return post$.pipe(
            switchMap((post) =>
                this.postService.addPost(post)
            )
        )
    })

    readonly updatePost = this.effect<{idEditingPost: number, post: Partial<Post>}>((params$) => {
        return params$.pipe(
            switchMap(({idEditingPost, post}) => 
                this.postService.updatePost(idEditingPost, post)
            )
        )
    })
}

@Component({
    selector: 'posts-form-component',
    standalone: false,
    templateUrl: './posts.form.component.html',
    styleUrls: ['./posts.form.component.css'],
    providers: [FormComponentStore]
}) export class PostFormComponent implements OnInit{

    postForm = new FormGroup({
        user: new FormControl('',[Validators.required]),
        content: new FormControl('')
    });
    
    constructor(private store: FormComponentStore, private router: Router, private route: ActivatedRoute){}

    ngOnInit(){
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.store.setIdEditingPost(Number(id));
            this.store.getPostById(this.store.idEditingPost$);
            this.store.post$.subscribe(post => this.postForm.patchValue({
                user: post?.user,
                content: post?.content
            }));
        }   
    }

    submit(){
        const id = this.store.idEditingPost$.subscribe( id => {
            if (id !== null) {
                this.store.updatePost({idEditingPost: id, post: this.postForm.value as Post})
            } else {
                this.store.addPost(this.postForm.value as Post)
            }
        })
        this.router.navigate(['/posts/list']);
    }
}
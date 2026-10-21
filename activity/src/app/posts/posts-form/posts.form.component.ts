import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {Post} from '../post';
import {Router, ActivatedRoute} from '@angular/router';
import { Store } from '@ngrx/store';
import { getEditingPost } from '../state/posts.selectors';
import { createPostRequested, getPostByIdRequested, updatePostRequested } from '../state/posts.actions';
import { filter, take } from 'rxjs';

@Component({
    selector: 'posts-form-component',
    standalone: false,
    templateUrl: './posts.form.component.html',
    styleUrls: ['./posts.form.component.css']
}) export class PostFormComponent implements OnInit{

    private idEditingPost: number | null = null;

    postForm = new FormGroup({
        user: new FormControl('',[Validators.required]),
        content: new FormControl('')
    });
    

    constructor(private store: Store, private router: Router, private route: ActivatedRoute){}

    ngOnInit(){
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.idEditingPost = Number(id);
            this.store.dispatch(getPostByIdRequested({id: this.idEditingPost}))
            this.store.select(getEditingPost).pipe(filter((post): post is Post => !!post, take(1))).subscribe(post => this.postForm.patchValue(post));
        }   
    }

    submit(){
        if (this.idEditingPost !== null) {
            this.store.dispatch(updatePostRequested({id: this.idEditingPost,changes: this.postForm.value as Post}));
        } else {
            this.store.dispatch(createPostRequested({post: this.postForm.value as Post}));
        }
        this.router.navigate(['/posts/list']);
    }
}
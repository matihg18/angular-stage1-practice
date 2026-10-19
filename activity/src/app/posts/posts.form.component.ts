import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {PostService} from './post.service';
import {Observable} from 'rxjs';
import {Post} from './post'
import {Router} from '@angular/router'

@Component({
    selector: 'posts-form-component',
    standalone: false,
    templateUrl: './posts.form.component.html',
    styleUrls: ['./posts.form.component.css']
}) export class PostFormComponent implements OnInit{

    public posts$!: Observable<Post[]>;

    postForm = new FormGroup({
        user: new FormControl('',[Validators.required]),
        content: new FormControl('')
    });
    

    constructor(private postService: PostService, private router: Router){}

    ngOnInit(){
        this.posts$ = this.postService.allPosts$;
        this.postService.loadPosts();
    }

    submit(){
        let post = this.postForm.value as Post;
        post.published = new Date;
        this.postService.addPost(this.postForm.value as Post);
        this.router.navigate(['/posts/list']);
    }
}
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {PostService} from '../post.service';
import {Observable} from 'rxjs';
import {Post} from '../post'
import {Router, ActivatedRoute} from '@angular/router'

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
    

    constructor(private postService: PostService, private router: Router, private route: ActivatedRoute){}

    ngOnInit(){
        this.postService.loadPosts();
        
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.idEditingPost = Number(id);
            const post = this.postService.getPostById(this.idEditingPost);
            if (post) {this.postForm.patchValue(post)};
        }   
    }

    submit(){
        if (this.idEditingPost !== null) {
            this.postService.updatePost(this.idEditingPost,this.postForm.value as Post);
        } else {
            this.postService.addPost(this.postForm.value as Post);
        }
        this.router.navigate(['/posts/list']);
    }
}
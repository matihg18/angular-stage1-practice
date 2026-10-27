import {Injectable, Inject, signal} from '@angular/core';
import {Post} from './post';
import { of } from 'rxjs';
import { POSTS } from '../data';

@Injectable({providedIn: 'root'})
export class PostService{

    public posts = [...POSTS];
    public postsCount = signal(this.posts.length);

    constructor(){}

    public getAllPosts(){
        return of(this.posts)
    }

    public addPost(post: Post) {
        const newPost = {
            ...post,
            id: Math.max(0, ...this.posts.map(p => p.id)) + 1,
            published: new Date
        } as Post;
        this.posts = [...this.posts, newPost];
        this.postsCount.update(value => value+1);
        return of(newPost)
    }

    public updatePost(id: number, changes: Partial<Post>) {
        this.posts = this.posts.map(post => post.id === id ? {...post, ...changes} : post);
        return of(this.posts.find(post => post.id === id))
    }

    public getPostById(id: number) {
        return of(this.posts.find(post => post.id === id))
    }
}

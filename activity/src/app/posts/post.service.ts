import {Injectable, InjectionToken, Inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Post} from './post';
import { BehaviorSubject, of } from 'rxjs';
import { POSTS } from '../data';

export const BASE_URL = new InjectionToken<string>('BASE_URL');

@Injectable(
    {providedIn: 'root'}
)
export class PostService{

    public posts = [...POSTS]

    constructor(
        private httpClient: HttpClient,
        @Inject(BASE_URL) public baseUrl: string
    ){}

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
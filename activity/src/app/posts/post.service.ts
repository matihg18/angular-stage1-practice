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

    private subject = new BehaviorSubject<Post[]>([]);
    public allPosts$ = this.subject.asObservable();
    private loaded = false;

    constructor(
        private httpClient: HttpClient,
        @Inject(BASE_URL) public baseUrl: string
    ){}

    public loadPosts(){
        if (this.loaded) return;
        this.getAllPost().subscribe(posts => this.subject.next(posts));
        this.loaded=true;
    }

    public getAllPost(){
        //return this.httpClient.get<Post[]>(`${this.baseUrl}`);
        return of(POSTS); //Esto es para tener los ids, que necesito para editar comentarios y que en el json no vienen.
    }

    public addPost(post: Post) {
        post.published = new Date;
        post.id = this.subject.value.length+1;
        this.subject.next([...this.subject.value, post]);
    }

    public updatePost(id: number, changes: Partial<Post>) {
        const updatedList = this.subject.value.map(
            post => post.id === id ? {...post,...changes} : post
        );
        this.subject.next(updatedList);
    }

    public getPostById(id: number) {
        return this.subject.value.find(post => post.id === id);
    }
}
import {Injectable, InjectionToken, Inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Post} from './post';
import { BehaviorSubject } from 'rxjs'

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
        return this.httpClient.get<Post[]>(`${this.baseUrl}`);
    }

    public addPost(post: Post) {
        this.subject.next([...this.subject.value, post]);
    }
}
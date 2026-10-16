import {Injectable, InjectionToken, Inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Post} from './post';

export const BASE_URL = new InjectionToken<string>('BASE_URL');

@Injectable(
    {providedIn: 'root'}
)
export class PostService{
    constructor(
        private httpClient: HttpClient,
        @Inject(BASE_URL) public baseUrl: string
    ){}

    public getAllPost(){
        return this.httpClient.get<Post[]>(`${this.baseUrl}`);
    }
}
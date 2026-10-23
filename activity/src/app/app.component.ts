import { Component, Injectable, signal, OnInit } from '@angular/core';
import { switchMap } from 'rxjs';
import { ComponentStore } from '@ngrx/component-store';
import { PostService } from './posts/post.service';
import { tapResponse } from '@ngrx/operators';

export interface AppComponentState {
  postsCount: number
}

@Injectable()
export class AppComponentStore extends ComponentStore<AppComponentState> {
  readonly vm$ = this.select((state) => ({postsCount: state.postsCount}))

  constructor(private postService: PostService){
    super({
      postsCount: 0
    })
  }

  readonly setPostsCount = this.updater((state, postsCount: number) => ({...state, postsCount: postsCount}));
  readonly setError = this.updater((state, error: string) => ({...state, error}))

  readonly getPostsTotalCount = this.effect<void>(
    (trigger$) => trigger$.pipe(
      switchMap(() => 
        this.postService.getPostsCount().pipe(
          tapResponse({
            next: (postsCount) => this.setPostsCount(postsCount),
            error: (err) => this.setError('Couldnt get the posts count')
          })
        )
      )
    )
  )
}

@Component({
  selector: 'app-root',
  standalone: false,
  styleUrl: './app.css',
  templateUrl: './app.html',
  providers: [AppComponentStore]
})
export class AppComponent implements OnInit{
  protected readonly title = signal('activity')

  constructor(private store: AppComponentStore){}

  ngOnInit(){
    this.store.getPostsTotalCount();
  }
}

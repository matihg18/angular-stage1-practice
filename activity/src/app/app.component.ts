import { Component, Injectable, signal } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { PostService } from './posts/post.service';
import { toObservable } from '@angular/core/rxjs-interop';

export interface AppComponentState {
  postsCount: number
}

@Injectable({providedIn: 'root'})
export class AppComponentStore extends ComponentStore<AppComponentState> {
  readonly vm = this.selectSignal((state) => (state.postsCount))

  constructor(private postService: PostService){
    super({
      postsCount: postService.postsCount()
    })
    this.setPostsCount(toObservable(this.postService.postsCount));
  }

  readonly setError = this.updater((state, error: string) => ({...state, error}));
  readonly setPostsCount = this.updater((state, postsCount: number) => ({...state, postsCount}));
}

@Component({
  selector: 'app-root',
  standalone: false,
  styleUrl: './app.css',
  templateUrl: './app.html'
})
export class AppComponent {
  protected readonly title = signal('activity')


  constructor(private store: AppComponentStore){}
}

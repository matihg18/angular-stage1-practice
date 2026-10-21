import { Component, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { getPostsCount } from './posts/state/posts.selectors';
import { Observable } from 'rxjs';
import { inject } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: false,
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class AppComponent {
  protected readonly title = signal('activity');

  private store = inject(Store);
  protected postsCount = this.store.selectSignal(getPostsCount);

  constructor(){}
}

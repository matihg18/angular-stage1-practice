import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {PostComponentSmart} from './posts/posts.component.smart';
import {Post} from './posts/post';

@Component({
  selector: 'app-root',
  standalone: false,
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('activity');
}

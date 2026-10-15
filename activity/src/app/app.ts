import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {PostComponent,Post} from './posts/posts.component';
import {data} from "./data";

@Component({
  selector: 'app-root',
  standalone: false,
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('activity');
  posts = data;
}

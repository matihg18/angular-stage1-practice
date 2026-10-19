import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Post} from './posts/post';

@Component({
  selector: 'app-root',
  standalone: false,
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class AppComponent {
  protected readonly title = signal('activity');
}

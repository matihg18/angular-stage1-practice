import {NgModule} from "@angular/core";
import {CommonModule} from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { PostComponentSmart } from './posts.component.smart';
import { PostComponentDumb} from './posts.component.dumb';
import { PostListComponent } from './postslist.component';

import {BASE_URL} from './post.service';
import {baseUrl} from '../environment';

@NgModule({
  declarations: [PostListComponent, PostComponentSmart, PostComponentDumb],
  imports: [CommonModule, BrowserModule, FormsModule],
  exports: [PostComponentSmart],
  providers: [
    {provide: BASE_URL, useValue: baseUrl}
  ]
})
export class PostModule {}
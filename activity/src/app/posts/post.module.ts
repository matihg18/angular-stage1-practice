import {NgModule} from "@angular/core";
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import { App } from '../app';
import { PostComponentSmart } from './posts.component.smart';
import { PostComponentDumb} from './posts.component.dumb';
import { PostListComponent } from './postslist.component';

import {BASE_URL} from './post.service';
import {baseUrl} from '../environment';

@NgModule({
  declarations: [App, PostComponentSmart, PostListComponent, PostComponentDumb],
  imports: [BrowserModule, FormsModule],
  bootstrap: [App],
  providers: [
    {provide: BASE_URL, useValue: baseUrl}
  ]
})
export class PostModule {}
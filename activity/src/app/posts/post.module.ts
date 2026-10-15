import {NgModule} from "@angular/core";
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { App } from '../app';
import { PostComponent } from './posts.component';
import { PostListComponent } from './postslist.component';

@NgModule({
  declarations: [App, PostComponent, PostListComponent],
  imports: [BrowserModule, FormsModule],
  bootstrap: [App],
})
export class PostModule {}
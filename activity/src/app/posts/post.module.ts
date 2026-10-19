import {NgModule} from "@angular/core";
import {CommonModule} from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PostComponentSmart } from './posts.component.smart';
import { PostComponentDumb} from './posts.component.dumb';
import { PostListComponent } from './postslist.component';
import { PostFormComponent } from './posts.form.component'

import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'list',
    component: PostComponentSmart
  },
  {
    path: 'create',
    component: PostFormComponent
  },
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  }
]

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule.forChild(routes)],
  declarations: [PostListComponent, PostComponentSmart, PostComponentDumb, PostFormComponent],
  exports: [PostComponentSmart, PostFormComponent]
})
export class PostModule {}
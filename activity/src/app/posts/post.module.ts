import {NgModule} from "@angular/core";
import { PostComponentSmart } from './posts-list/posts.component.smart';
import { PostFormComponent } from './posts-form/posts.form.component';

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
    path: 'edit/:id',
    component: PostFormComponent
  },
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    PostComponentSmart,
    PostFormComponent
  ]
})
export class PostModule {}
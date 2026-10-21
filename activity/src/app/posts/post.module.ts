import {NgModule} from "@angular/core";
import {CommonModule} from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PostComponentSmart } from './posts-list/posts.component.smart';
import { PostComponentDumb} from './posts-list/posts.component.dumb';
import { PostListComponent } from './posts-list/postslist.component';
import { PostFormComponent } from './posts-form/posts.form.component';

import { POST_STATE_KEY, reducer } from "./state/posts.reducer";
import { EffectsModule } from "@ngrx/effects";
import { PostEffects } from "./state/posts.effects";
import { StoreModule } from "@ngrx/store";

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
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature(POST_STATE_KEY, reducer),
    EffectsModule.forFeature([PostEffects])
  ],
  declarations: [PostListComponent, PostComponentSmart, PostComponentDumb, PostFormComponent],
  exports: [PostComponentSmart, PostFormComponent]
})
export class PostModule {}
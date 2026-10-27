import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'posts',
    loadChildren: () => import('./posts/post.module').then((x) => x.PostModule),
  },
  {
    path: '',
    redirectTo: 'posts',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}

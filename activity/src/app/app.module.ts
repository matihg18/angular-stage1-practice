import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

import { RouterModule, Routes } from '@angular/router';

import {BASE_URL} from './posts/post.service';
import {baseUrl} from './environment';


const routes: Routes = [
    {
        path: 'posts',
        loadChildren: () => import('./posts/post.module').then(x => x.PostModule)
    },
    {
        path: '',
        redirectTo: 'posts',
        pathMatch: 'full'
    }
]


@NgModule({
    imports: [BrowserModule, FormsModule, RouterModule.forRoot(routes)],
    declarations: [AppComponent],
    bootstrap: [AppComponent],
    providers: [
    {provide: BASE_URL, useValue: baseUrl}
  ]
})
export class AppModule {}
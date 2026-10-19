import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { PostModule } from './posts/post.module'


@NgModule({
    imports: [BrowserModule, FormsModule, PostModule],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule {}
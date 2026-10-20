import {Component, Input, OnInit} from "@angular/core";
import {Post} from '../post';
import { Router } from '@angular/router';

@Component({
    selector: 'post-component-dumb',
    standalone: false,
    templateUrl: './posts.component.dumb.html',
    styleUrls: ['./posts.component.dumb.css']
})
export class PostComponentDumb implements OnInit {
    @Input() post!: Post;
    hidden = true;

    hideContent(){
        this.hidden=!this.hidden;
    }

    constructor(){}

    ngOnInit(){}
}
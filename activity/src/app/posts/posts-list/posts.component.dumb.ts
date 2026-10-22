import {Component, Injectable, Input, OnInit} from "@angular/core";
import {Post} from '../post';
import { ComponentStore } from '@ngrx/component-store';

export interface DumbComponentState {
    post: Post | null,
    hidden: boolean
}

@Injectable()
export class DumbComponentStore extends ComponentStore<DumbComponentState> {
    readonly vm$ = this.select((state) => ({ //view model para acceder al state mas facil desde el template
        post: state.post,
        hidden: state.hidden
    }));

    constructor(){
        super({
            post: null,
            hidden: true
        })
    }

    readonly setPost = this.updater((state, post: Post | null) => ({...state, post}));
    readonly changeHidden = this.updater((state) => ({...state, hidden: !state.hidden}));
};

@Component({
    selector: 'post-component-dumb',
    standalone: false,
    templateUrl: './posts.component.dumb.html',
    styleUrls: ['./posts.component.dumb.css'],
    providers: [DumbComponentStore]
})
export class PostComponentDumb implements OnInit {

    @Input() set post(value: Post | null) {
        this.store.setPost(value);
    }

    constructor(readonly store: DumbComponentStore){}

    ngOnInit(){}
}
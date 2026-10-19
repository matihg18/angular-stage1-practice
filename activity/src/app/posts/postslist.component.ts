import {Component, Input, OnInit, ChangeDetectionStrategy } from "@angular/core";
import {Post} from "./post"

@Component({
    selector: 'post-list-component',
    standalone: false,
    templateUrl: './postslist.component.html',
    styleUrls: ['./postslist.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush

})
export class PostListComponent implements OnInit {
    @Input() posts!:Post[];

    constructor(){}

    ngOnInit(){}
}
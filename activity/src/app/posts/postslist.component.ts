import {Component, Input, OnInit} from "@angular/core";
import {Post} from "./post"

@Component({
    selector: 'post-list-component',
    standalone: false,
    templateUrl: './postslist.component.html',
    styleUrls: ['./postslist.component.css']
})
export class PostListComponent implements OnInit {
    @Input() posts!:Post[];

    constructor(){}

    ngOnInit(){}
}
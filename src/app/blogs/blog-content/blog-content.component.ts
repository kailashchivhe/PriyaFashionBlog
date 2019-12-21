import { Component, OnInit } from '@angular/core';
import { BlogData } from 'src/app/model/BlogData';

@Component({
  selector: 'app-blog-content',
  templateUrl: './blog-content.component.html',
  styleUrls: ['./blog-content.component.scss']
})
export class BlogContentComponent implements OnInit {
  slides=[ '../assets/images/facebook1.jpg','../assets/images/facebook2.jpg']
  post:BlogData=
    {type:"fashion",
    title:"Demo",
    subtitle:"subtitle",
    description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Exercitationem facilis sunt repellendus excepturi beatae porro debitis voluptate nulla quo veniam fuga sit molestias minus.",
    coverPhoto: "https://mdbootstrap.com/img/Photos/Others/img%20(27).jpg",
    pic1: "https://mdbootstrap.com/img/Photos/Others/img%20(27).jpg",
    pic2: "https://mdbootstrap.com/img/Photos/Others/img%20(27).jpg",
    pic3: "https://mdbootstrap.com/img/Photos/Others/img%20(27).jpg"};
  constructor() { }

  ngOnInit() {
  }

}

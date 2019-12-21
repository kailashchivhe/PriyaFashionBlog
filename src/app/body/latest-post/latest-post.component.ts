import { Component, OnInit } from '@angular/core';
import { BlogsService } from 'src/app/sharedServices/firebaseService/blogs.service';
import { BlogData } from 'src/app/model/BlogData';

@Component({
  selector: 'app-latest-post',
  templateUrl: './latest-post.component.html',
  styleUrls: ['./latest-post.component.scss']
})
export class LatestPostComponent implements OnInit {

  latestPosts:BlogData[]=[
    {type:"fashion",title:"Demo",subtitle:"subtitle",description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Exercitationem facilis sunt repellendus excepturi beatae porro debitis voluptate nulla quo veniam fuga sit molestias minus.",
    coverPhoto: "https://mdbootstrap.com/img/Photos/Others/img%20(27).jpg",
    pic1: "https://mdbootstrap.com/img/Photos/Others/img%20(27).jpg",
    pic2: "https://mdbootstrap.com/img/Photos/Others/img%20(27).jpg",
    pic3: "https://mdbootstrap.com/img/Photos/Others/img%20(27).jpg"},
    {type:"fashion",title:"Demo",subtitle:"subtitle",description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Exercitationem facilis sunt repellendus excepturi beatae porro debitis voluptate nulla quo veniam fuga sit molestias minus.",
    coverPhoto: "https://mdbootstrap.com/img/Photos/Others/img%20(27).jpg",
    pic1: "https://mdbootstrap.com/img/Photos/Others/img%20(27).jpg",
    pic2: "https://mdbootstrap.com/img/Photos/Others/img%20(27).jpg",
    pic3: "https://mdbootstrap.com/img/Photos/Others/img%20(27).jpg"},
    {type:"fashion",title:"Demo",subtitle:"subtitle",description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Exercitationem facilis sunt repellendus excepturi beatae porro debitis voluptate nulla quo veniam fuga sit molestias minus.",
    coverPhoto: "https://mdbootstrap.com/img/Photos/Others/img%20(27).jpg",
    pic1: "https://mdbootstrap.com/img/Photos/Others/img%20(27).jpg",
    pic2: "https://mdbootstrap.com/img/Photos/Others/img%20(27).jpg",
    pic3: "https://mdbootstrap.com/img/Photos/Others/img%20(27).jpg"},
  ]
  constructor(private blogService:BlogsService) { }

  ngOnInit() {
    this.blogService.getAllBlogs()
  }

}

import { Component, OnInit } from '@angular/core';
import { BlogData } from 'src/app/model/BlogData';

@Component({
  selector: 'app-beauty-list',
  templateUrl: '../generic-blog-list.html',
  styleUrls: ['../generic-blog-list.scss']
})
export class BeautyListComponent implements OnInit{
  categoryName:String = "BEAUTY";
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
  constructor() {
  }

  ngOnInit() {
  }

  getUrl()
  {
    return "url('../../../../assets/images_data/beauty/beauty_cover_pic1.jpg')";
  }

}

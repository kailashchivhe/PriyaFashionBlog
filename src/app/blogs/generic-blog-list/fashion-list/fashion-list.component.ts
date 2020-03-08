import { Component, OnInit } from '@angular/core';
import { BlogData } from 'src/app/model/BlogData';
import { BlogsService } from 'src/app/sharedServices/firebaseService/blogs.service';
import { Router } from '@angular/router';
import { FirebaseCallback } from 'src/app/model/firebaseCallback';

@Component({
  selector: 'app-fashion-list',
  templateUrl: '../generic-blog-list.html',
  styleUrls: ['../generic-blog-list.scss']
})
export class FashionListComponent implements OnInit,FirebaseCallback{
  categoryName:string = "FASHION";
  latestPosts:BlogData[];
  bShowloader:boolean=true;
  
  constructor(private blogService:BlogsService,private router:Router) {
  }

  onDataReceived(blogList: BlogData[]) {
    this.latestPosts = [];
    for( var blog of blogList )
    {
      if( blog.type === "fashion" )
      {
        this.latestPosts.push(blog);
      }
    }
    this.bShowloader = false;
  }

  ngOnInit() {
    this.blogService.getBlogsData( this );
  }
  
  navigateToBlogContent(blogKey:string){
    this.router.navigateByUrl(`/content/${blogKey}`);
  }

  getUrl()
  {
    return "url('../../../../assets/images_data/fashion/fashion_cover_pic.jpeg')";
  }
}

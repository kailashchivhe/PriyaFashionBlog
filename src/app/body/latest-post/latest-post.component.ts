import { Component, OnInit } from '@angular/core';
import { BlogsService } from 'src/app/sharedServices/firebaseService/blogs.service';
import { BlogData } from 'src/app/model/BlogData';
import { Router } from '@angular/router';
import { FirebaseCallback } from 'src/app/model/firebaseCallback';

@Component({
  selector: 'app-latest-post',
  templateUrl: './latest-post.component.html',
  styleUrls: ['./latest-post.component.scss']
})
export class LatestPostComponent implements OnInit,FirebaseCallback {
  latestPosts:BlogData[];
  public bShowloader = true;

  constructor(private blogService:BlogsService,private router:Router) {}
  
  onDataReceived(blogList: BlogData[], bServerData:boolean ) {
    this.latestPosts = [];
    var i = 0;
    for( var blog of blogList )
    {
      if( i >= 3 )
      {
        break;
      }
      this.latestPosts.push(blog);
      i = i + 1;
    }
    this.bShowloader = false;
  }

  ngOnInit() {
    this.blogService.getLatestBlogs( this );
  }

  onItemClick(blog : BlogData){
    this.blogService.selectedBlog = Object.assign({}, blog);
  }

  navigateToBlogContent(blogKey:string){
    this.router.navigateByUrl(`/content/${blogKey}`);
  }
}

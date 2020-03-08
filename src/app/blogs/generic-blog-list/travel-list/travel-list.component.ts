import { Component, OnInit, OnDestroy } from '@angular/core';
import { BlogData } from 'src/app/model/BlogData';
import { BlogsService } from 'src/app/sharedServices/firebaseService/blogs.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FirebaseCallback } from 'src/app/model/firebaseCallback';

@Component({
  selector: 'app-travel-list',
  templateUrl: '../generic-blog-list.html',
  styleUrls: ['../generic-blog-list.scss']
})
export class TravelListComponent implements OnInit,FirebaseCallback{
  categoryName:string = "TRAVEL";
  latestPosts:BlogData[];
  bShowloader:boolean=true;
  
  constructor(private blogService:BlogsService,private router:Router) { 
  }

  onDataReceived(blogList: BlogData[]) {
    this.latestPosts = [];
    for( var blog of blogList )
    {
      if( blog.type === "travel" )
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
    return "url('../../../../assets/images_data/travel/travel_cover_pic.jpg')";
  }
}

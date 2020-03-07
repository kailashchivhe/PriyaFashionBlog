import { Component, OnInit, OnDestroy } from '@angular/core';
import { BlogData } from 'src/app/model/BlogData';
import { BlogsService } from 'src/app/sharedServices/firebaseService/blogs.service';
import { Router } from '@angular/router';
import { FirebaseCallback } from 'src/app/model/firebaseCallback';

@Component({
  selector: 'app-beauty-list',
  templateUrl: '../generic-blog-list.html',
  styleUrls: ['../generic-blog-list.scss']
})
export class BeautyListComponent implements OnInit,FirebaseCallback{
  categoryName:string = "BEAUTY";
  latestPosts:BlogData[] = [];
  bShowloader:boolean=true;
  
  constructor(private blogService:BlogsService,private router:Router) {
  }

  onDataReceived(blogList: BlogData[]) {
    for( var blog of blogList )
    {
      if( blog.type === "beauty" )
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
    return "url('../../../../assets/images_data/beauty/beauty_cover_pic1.jpg')";
  }

}

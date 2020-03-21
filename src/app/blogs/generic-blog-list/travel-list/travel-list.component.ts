import { Component, OnInit, OnDestroy } from '@angular/core';
import { BlogData } from 'src/app/model/BlogData';
import { BlogsService } from 'src/app/sharedServices/firebaseService/blogs.service';
import { Router } from '@angular/router';
import { FirebaseCallback } from 'src/app/model/firebaseCallback';
import { HeaderImageCallback } from 'src/app/model/HeaderImageCallback';
import { HeaderImagesUploadService } from 'src/app/sharedServices/firebaseService/header-images-upload.service';

@Component({
  selector: 'app-travel-list',
  templateUrl: '../generic-blog-list.html',
  styleUrls: ['../generic-blog-list.scss']
})
export class TravelListComponent implements OnInit,FirebaseCallback,HeaderImageCallback{
  categoryName:string = "TRAVEL";
  latestPosts:BlogData[];
  bShowloader:boolean=true;
  headerImage: string = "../../../assets/images_data/pattern.png";
  
  constructor(private blogService:BlogsService,private router:Router,private headerImageService:HeaderImagesUploadService) { 
  }

  onDataReceived(blogList: BlogData[],bServerData:boolean) {
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
    this.headerImageService.getContentHeaderImage( 4,this );
    this.blogService.getBlogsData( this );
  }

  navigateToBlogContent(blogKey:string){
    this.router.navigateByUrl(`/content/${blogKey}`);
  }

  getUrl()
  {
    return `url(${this.headerImage})`;
  }

  allImagesReceived(images: string[]) {}

  contentSpecificHeader(image: string) {
    this.headerImage = image;
  }
}

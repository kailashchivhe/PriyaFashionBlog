import { Component, OnInit } from '@angular/core';
import { BlogData } from 'src/app/model/BlogData';
import { BlogsService } from 'src/app/sharedServices/firebaseService/blogs.service';
import { Router } from '@angular/router';
import { HeaderImagesUploadService } from 'src/app/sharedServices/firebaseService/header-images-upload.service';
import { HeaderImageCallback } from 'src/app/model/HeaderImageCallback';

@Component({
  selector: 'app-food-list',
  templateUrl: '../generic-blog-list.html',
  styleUrls: ['../generic-blog-list.scss']
})
export class FoodListComponent implements OnInit,HeaderImageCallback{
  categoryName:string = "Food";
  latestPosts:BlogData[];
  bShowloader:boolean=true;
  headerImage: string;
  constructor(private blogService:BlogsService,private router:Router,private headerImageService:HeaderImagesUploadService) {
  }

  ngOnInit() {
    this.headerImageService.getContentHeaderImage( 2,this );
    var data = this.blogService.getAllBlogs();
    data.snapshotChanges().subscribe(item => {
      this.latestPosts = [];
      item.forEach(element => {
        var y = element.payload.toJSON();
        y["$key"] = element.key;
        let data = y as BlogData;
        if( data.type === "food" )
        {
          this.latestPosts.push(y as BlogData);
        }
      })
      this.bShowloader=false;
    })
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

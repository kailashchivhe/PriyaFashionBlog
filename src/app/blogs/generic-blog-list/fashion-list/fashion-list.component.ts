import { Component, OnInit, OnDestroy } from '@angular/core';
import { BlogData } from 'src/app/model/BlogData';
import { BlogsService } from 'src/app/sharedServices/firebaseService/blogs.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-fashion-list',
  templateUrl: '../generic-blog-list.html',
  styleUrls: ['../generic-blog-list.scss']
})
export class FashionListComponent implements OnInit,OnDestroy{
  categoryName:string = "FASHION";
  latestPosts:BlogData[];
  bShowloader:boolean=true;
  subscribe:Subscription;
  
  constructor(private blogService:BlogsService,private router:Router) {
  }

  ngOnInit() {
    var data = this.blogService.getAllBlogs();
    this.subscribe=data.snapshotChanges().subscribe(item => {
      this.latestPosts = [];
      item.forEach(element => {
        var y = element.payload.toJSON();
        y["$key"] = element.key;
        let data = y as BlogData;
        if( data.type === "fashion" )
        {
          this.latestPosts.push(y as BlogData);
        }
      })
      this.bShowloader=false;
    })
  }

  ngOnDestroy(): void {
    this.subscribe.unsubscribe();
  }
  
  navigateToBlogContent(blogKey:string){
    this.router.navigateByUrl(`/content/${blogKey}`);
  }

  getUrl()
  {
    return "url('../../../../assets/images_data/fashion/fashion_cover_pic.jpeg')";
  }
}

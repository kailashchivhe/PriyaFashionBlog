import { Component, OnInit } from '@angular/core';
import { BlogData } from 'src/app/model/BlogData';
import { BlogsService } from 'src/app/sharedServices/firebaseService/blogs.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-beauty-list',
  templateUrl: '../generic-blog-list.html',
  styleUrls: ['../generic-blog-list.scss']
})
export class BeautyListComponent implements OnInit{
  categoryName:String = "BEAUTY";
  latestPosts:BlogData[];
  bShowloader:boolean=true;
  constructor(private blogService:BlogsService,private router:Router) {
  }

  ngOnInit() {
    var data = this.blogService.getAllBlogs();
    data.snapshotChanges().subscribe(item => {
      this.latestPosts = [];
      item.forEach(element => {
        var y = element.payload.toJSON();
        y["$key"] = element.key;
        let data = y as BlogData;
        if( data.type === "beauty" )
        {
          this.latestPosts.push(y as BlogData);
        }
      })
      this.bShowloader=false;
    })
  }

  navigateToBlogContent(blogKey:string){
    this.latestPosts.forEach(post=>{
      if( post.$key === blogKey )
      {
        this.blogService.setSelectedBlog(post);
      }
    });
    this.router.navigateByUrl("/content");
  }

  getUrl()
  {
    return "url('../../../../assets/images_data/beauty/beauty_cover_pic1.jpg')";
  }

}

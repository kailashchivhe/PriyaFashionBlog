import { Component, OnInit } from '@angular/core';
import { BlogsService } from 'src/app/sharedServices/firebaseService/blogs.service';
import { BlogData } from 'src/app/model/BlogData';
import { Router } from '@angular/router';

@Component({
  selector: 'app-latest-post',
  templateUrl: './latest-post.component.html',
  styleUrls: ['./latest-post.component.scss']
})
export class LatestPostComponent implements OnInit {

  latestPosts:BlogData[];
  constructor(private blogService:BlogsService,private router:Router) { }
  public bShowloader = true;

  ngOnInit() {
    var data = this.blogService.getAllBlogs();
    let cnt = 0;
    data.snapshotChanges().subscribe(item => {
      this.latestPosts = [];
      item.forEach(element => {
        var y = element.payload.toJSON();
        y["$key"] = element.key;
        if( cnt < 3 )
        {
          this.latestPosts.push(y as BlogData);
          cnt=cnt+1;
        }
      })
      this.bShowloader=false;
    })
  }

  onItemClick(blog : BlogData){
    this.blogService.selectedBlog = Object.assign({}, blog);
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
}

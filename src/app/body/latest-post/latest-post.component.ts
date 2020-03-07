import { Component, OnInit } from '@angular/core';
import { BlogsService } from 'src/app/sharedServices/firebaseService/blogs.service';
import { BlogData } from 'src/app/model/BlogData';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-latest-post',
  templateUrl: './latest-post.component.html',
  styleUrls: ['./latest-post.component.scss']
})
export class LatestPostComponent implements OnInit {

  latestPosts:BlogData[];
  public bShowloader = true;
  subscribe:Subscription;

  constructor(private blogService:BlogsService,private router:Router) { 
    
  }
  
  ngOnInit() {
    var data = this.blogService.getLatestBlogs();
    let cnt = 0;
    this.subscribe=data.snapshotChanges().subscribe(item => {
      let posts = [];
      item.forEach(element => {
        var y = element.payload.toJSON();
        y["$key"] = element.key;
        posts.push(y as BlogData);
      })
      this.latestPosts = posts.reverse();
      this.bShowloader=false;
    })
  }

  ngOnDestroy(): void {
    this.subscribe.unsubscribe();
  }

  onItemClick(blog : BlogData){
    this.blogService.selectedBlog = Object.assign({}, blog);
  }

  navigateToBlogContent(blogKey:string){
    this.router.navigateByUrl(`/content/${blogKey}`);
  }
}

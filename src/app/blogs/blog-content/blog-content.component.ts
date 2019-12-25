import { Component, OnInit } from '@angular/core';
import { BlogData } from 'src/app/model/BlogData';
import { BlogsService } from 'src/app/sharedServices/firebaseService/blogs.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blog-content',
  templateUrl: './blog-content.component.html',
  styleUrls: ['./blog-content.component.scss']
})
export class BlogContentComponent implements OnInit {
  slides=[];
  post:BlogData;
  constructor(private blogService:BlogsService,private router:Router) { }

  ngOnInit() {
    this.post = this.blogService.getSelectedBlog();
    if( this.post == null )
    {
      alert("Please Select a Blog");
      this.router.navigateByUrl("/");
    }
    else{
      this.slides.push(this.post.pic1);
      this.slides.push(this.post.pic2);
      this.slides.push(this.post.pic3);
    }
  }

  ngOnDestroy(){
    this.blogService.clearSelectedBlog();
  }
  
  getUrl()
  {
    if( this.post != null )
    {
      return "url('"+this.post.coverPhoto+"')";
    }
  }
}

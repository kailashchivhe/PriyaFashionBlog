import { Component, OnInit } from '@angular/core';
import { BlogData } from 'src/app/model/BlogData';
import { BlogsService } from 'src/app/sharedServices/firebaseService/blogs.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-blog-content',
  templateUrl: './blog-content.component.html',
  styleUrls: ['./blog-content.component.scss']
})
export class BlogContentComponent implements OnInit {
  slides=[];
  post:BlogData;
  bShowloader: boolean = true;
  constructor(private blogService:BlogsService,
    private toastr: ToastrService,
    private router:Router,private activatedRouter:ActivatedRoute) { }

  ngOnInit() {
    this.activatedRouter.paramMap.subscribe(params => { 
        console.log(params);
        let key = params.get('key');
        if( key )
        {
          var data = this.blogService.getAllBlogs();
          data.snapshotChanges().subscribe(item => {
            item.forEach(element => {
              var y = element.payload.toJSON();
              y["$key"] = element.key;
              let data = y as BlogData;
              if( data.$key === key )
              {
                this.post = data;
                this.slides.push(this.post.pic1);
                this.slides.push(this.post.pic2);
                this.slides.push(this.post.pic3);
              }
            })
            this.bShowloader=false;
          });
        }
        else
        {
          this.toastr.error("Please Select a Blog",'Error');
          this.router.navigateByUrl("error");
        }    
    });
  }

  ngOnDestroy(){

  }
  
  getUrl()
  {
    if( this.post != null )
    {
      return "url('"+this.post.coverPhoto+"')";
    }
  }
}

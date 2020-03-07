import { Component, OnInit, OnDestroy } from '@angular/core';
import { BlogData } from 'src/app/model/BlogData';
import { BlogsService } from 'src/app/sharedServices/firebaseService/blogs.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-blog-content',
  templateUrl: './blog-content.component.html',
  styleUrls: ['./blog-content.component.scss']
})
export class BlogContentComponent implements OnInit,OnDestroy {
  post:BlogData;
  bShowloader: boolean = true;
  subscribe:Subscription;
  row1=[];
  row2=[];

  constructor(private blogService:BlogsService,
    private toastr: ToastrService,
    private router:Router,private activatedRouter:ActivatedRoute) { }

  ngOnInit() {
    this.activatedRouter.paramMap.subscribe(params => {
        let key = params.get('key');
        if( key )
        {
          var data = this.blogService.getAllBlogs();
          this.subscribe = data.snapshotChanges().subscribe(item => {
            item.forEach(element => {
              var y = element.payload.toJSON();
              y["$key"] = element.key;
              let data = y as BlogData;
              if( data.$key === key )
              {
                this.post = data;
                this.pushRowData();
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
    this.subscribe.unsubscribe();
  }
  
  setModalImage( imageSrc: string )
  {
    document.getElementById('myModal').style.display = 'block';
    let modalImg = document.getElementById("img01") as HTMLImageElement;
    modalImg.src = imageSrc;
  }

  pushRowData()
  {
    if( this.post.pic1 != null && this.post.pic1 !== "" )
    {
      this.row1.push(this.post.pic1);
    }
    if( this.post.pic2 != null && this.post.pic2 !== "" )
    {
      this.row1.push(this.post.pic2);
    }
    if( this.post.pic3 != null && this.post.pic3 !== "" )
    {
      this.row1.push(this.post.pic3);
    }
    if( this.post.pic4 != null && this.post.pic4 !== "" )
    {
      this.row2.push(this.post.pic4);
    }
    if( this.post.pic5 != null && this.post.pic5 !== "" )
    {
      this.row2.push(this.post.pic5);
    }
    if( this.post.pic6 != null && this.post.pic6 !== "" )
    {
      this.row2.push(this.post.pic6);
    }
  }

  picClicked( index: number, rowNumber:number )
  {
    if( rowNumber == 1 )
    {
      this.displayPic( this.row1[index].toString() );
    }
    else
    {
      this.displayPic( this.row2[index].toString() );
    }
  }

  displayPic(image: string)
  {
    this.setModalImage(image);
  }

  spanClicked()
  {
    document.getElementById('myModal').style.display = 'none';
  }
  
  getUrl()
  {
    if( this.post != null )
    {
      return "url('"+this.post.coverPhoto+"')";
    }
  }
}

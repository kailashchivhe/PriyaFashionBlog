import { Component, OnInit, OnDestroy } from '@angular/core';
import { BlogData } from 'src/app/model/BlogData';
import { BlogsService } from 'src/app/sharedServices/firebaseService/blogs.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { FirebaseCallback } from 'src/app/model/firebaseCallback';

@Component({
  selector: 'app-blog-content',
  templateUrl: './blog-content.component.html',
  styleUrls: ['./blog-content.component.scss']
})
export class BlogContentComponent implements OnInit,FirebaseCallback{
  post:BlogData;
  bShowloader: boolean = true;
  key: string;
  row1=[];
  row2=[];

  constructor(private blogService:BlogsService,
    private toastr: ToastrService,
    private router:Router,private activatedRouter:ActivatedRoute) { }

  onDataReceived(blogList: BlogData[],bServerData:boolean) {
    for( var blog of blogList )
    {
        if( blog.$key == this.key )
        {
          this.bShowloader = false;
          this.post = blog;
          this.pushRowData();
          break;
        }
    }
  }

  ngOnInit() {
    this.activatedRouter.paramMap.subscribe(params => {
        this.key = params.get('key');
        if( this.key )
        {
          this.blogService.getBlogsData(this);
        }
        else
        {
          this.toastr.error("Please Select a Blog",'Error');
          this.router.navigateByUrl("error");
        }    
    });
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

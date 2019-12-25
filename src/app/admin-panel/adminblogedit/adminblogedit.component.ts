import { Component, OnInit } from '@angular/core';
import { BlogsService } from 'src/app/sharedServices/firebaseService/blogs.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BlogData } from 'src/app/model/BlogData';
import { NgxImageCompressService } from 'ngx-image-compress';

@Component({
  selector: 'app-adminblogedit',
  templateUrl: './adminblogedit.component.html',
  styleUrls: ['./adminblogedit.component.scss']
})
export class AdminblogeditComponent implements OnInit {
  id: number;
  editMode = false;
  blogForm: FormGroup;
  coverPic: String;
  pic1: String;
  pic2: String;
  pic3: String;
  updateBlog:boolean = false;

  constructor(private route: ActivatedRoute,
    private firebaseService: BlogsService,private imageService:NgxImageCompressService,
    private router: Router) { }

  ngOnInit() {
    this.initFormControls();
    this.firebaseService.getAllBlogs();
  }
  
  ngOnDestroy(){
    this.updateBlog = false;
  }

  onSubmit() 
  {
    this.onCancel();
  }

  onDeleteBook(key: string) 
  {
    this.firebaseService.deleteBlog(key);
  }

  onCancel() 
  {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  addBlog(){
    if(this.updateBlog)
    {
      this.updateBlog = false;
      let blog:BlogData = this.firebaseService.getSelectedBlog();
      blog.type = this.blogForm.get('type').value;
      blog.title = this.blogForm.get('title').value;
      blog.subtitle= this.blogForm.get('subtitle').value;
      blog.description= this.blogForm.get('description').value;
      if( this.coverPic != null )
      {
        blog.coverPhoto= this.coverPic;
      }
      if( this.pic1 != null )
      {
        blog.pic1= this.pic1;
      }
      if( this.pic2 != null )
      {
        blog.pic2= this.pic2;
      }
      if( this.pic3 != null )
      {
        blog.pic3= this.pic3;
      }
      this.firebaseService.updateBlog(blog);
      alert("Update Success");
    }
    else
    {
      let blogData= {
        type: this.blogForm.get('type').value,
        title: this.blogForm.get('title').value,
        subtitle: this.blogForm.get('subtitle').value,
        description: this.blogForm.get('description').value,
        coverPhoto: this.coverPic,
        pic1: this.pic1,
        pic2: this.pic2,
        pic3: this.pic3,
        time: new Date().toString()
      };
      this.firebaseService.pushData(blogData);
      alert("Upload Success");
    }
    this.router.navigateByUrl("/admin")
  }

  addCoverPic()
  {
    this.imageService.uploadFile().then(({image, orientation}) => {
    
      this.imageService.compressFile(image, orientation, 50, 50).then(
        result => {
          this.coverPic = result
          console.log('Size in bytes is now:', this.imageService.byteCount(result));
        }
      );
      
    });
  }

  addPic1()
  {
    this.imageService.uploadFile().then(({image, orientation}) => {
    
      this.imageService.compressFile(image, orientation, 40, 40).then(
        result => {
          this.pic1=result;
          console.log('Size in bytes is now:', this.imageService.byteCount(result));
        }
      );
      
    });
  }

  addPic2()
  {
    this.imageService.uploadFile().then(({image, orientation}) => {
    
      this.imageService.compressFile(image, orientation, 40, 40).then(
        result => {
          this.pic2=result;
          console.log('Size in bytes is now:', this.imageService.byteCount(result));
        }
      );
      
    });
  }

  addPic3()
  {
    this.imageService.uploadFile().then(({image, orientation}) => {
    
      this.imageService.compressFile(image, orientation, 40, 40).then(
        result => {
          this.pic3=result;
          console.log('Size in bytes is now:', this.imageService.byteCount(result));
        }
      );
      
    });
  }

  initFormControls()
  {
    let title;
    let subtitle;
    let description;
    let type;

    if( this.firebaseService.getSelectedBlog() != null ){
      this.updateBlog = true;
      let blogData:BlogData = this.firebaseService.getSelectedBlog();
      title = blogData.title;
      subtitle = blogData.subtitle;
      type= blogData.type;
      description = blogData.description;
    }
    this.blogForm = new FormGroup({
      'title': new FormControl(title,Validators.required),
      'subtitle': new FormControl(subtitle,Validators.required),
      'type': new FormControl(type,Validators.required),
      'description': new FormControl(description,Validators.required),
    });
  }
  
}

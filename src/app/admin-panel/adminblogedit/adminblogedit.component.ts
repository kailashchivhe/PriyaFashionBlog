import { Component, OnInit } from '@angular/core';
import { BlogsService } from 'src/app/sharedServices/firebaseService/blogs.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BlogData } from 'src/app/model/BlogData';
import { NgxImageCompressService } from 'ngx-image-compress';
import { ToastrService } from 'ngx-toastr';

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
  pic4: String;
  pic5: String;
  pic6: String;
  coverPicButton: String="primary";
  pic1Button: String="primary";
  pic2Button: String="primary";
  pic3Button: String="primary";
  pic4Button: String="primary";
  pic5Button: String="primary";
  pic6Button: String="primary";

  updateBlog:boolean = false;

  constructor(private route: ActivatedRoute,
    private firebaseService: BlogsService,
    private imageService:NgxImageCompressService,
    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit() {
    this.initFormControls();
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
      this.updateBlogValues(blog);
      this.firebaseService.updateBlog(blog);
      this.toastr.warning("Updated Data Success",'Blog Updated');
    }
    else
    {
      this.checkPicsValidity();
      let blogData= {
        type: this.blogForm.get('type').value,
        title: this.blogForm.get('title').value,
        subtitle: this.blogForm.get('subtitle').value,
        description: this.blogForm.get('description').value,
        coverPhoto: this.coverPic,
        pic1: this.pic1,
        pic2: this.pic2,
        pic3: this.pic3,
        pic4: this.pic4,
        pic5: this.pic5,
        pic6: this.pic6,
        time: new Date().toString()
      };
      this.firebaseService.pushData(blogData);
      this.toastr.success("Uploaded Blog Successfully",'Blog Uploaded');
    }
    this.router.navigateByUrl("/admin/panel")
  }

  checkPicsValidity() {
    if( this.coverPic == null || this.coverPic === "" )
    {
      this.coverPic = "";
    }
    if( this.pic1 == null || this.pic1 === "" )
    {
      this.pic1 = "";
    }
    if( this.pic2 == null || this.pic2 === "" )
    {
      this.pic2 = "";
    }
    if( this.pic3 == null || this.pic3 === "" )
    {
      this.pic3 = "";
    }
    if( this.pic4 == null || this.pic4 === "" )
    {
      this.pic4 = "";
    }
    if( this.pic5 == null || this.pic5 === "" )
    {
      this.pic5 = "";
    }
    if( this.pic6 == null || this.pic6 === "" )
    {
      this.pic6 = "";
    }
  }

  updateBlogValues( blog:BlogData )
  {
    blog.type = this.blogForm.get('type').value;
    blog.title = this.blogForm.get('title').value;
    blog.subtitle= this.blogForm.get('subtitle').value;
    blog.description= this.blogForm.get('description').value;
    if( this.coverPic != null )
    {
      blog.coverPhoto= this.coverPic;
    }
    else if( blog.coverPhoto == null )
    {
      blog.coverPhoto = "";
    }

    if( this.pic1 != null )
    {
      blog.pic1= this.pic1;
    }
    else if( blog.pic1 == null )
    {
      blog.pic1 = "";
    }

    if( this.pic2 != null )
    {
      blog.pic2= this.pic2;
    }
    else if( blog.pic2 == null )
    {
      blog.pic2 = "";
    }

    if( this.pic3 != null )
    {
      blog.pic3= this.pic3;
    }
    else if( blog.pic3 == null )
    {
      blog.pic3 = "";
    }

    if( this.pic4 != null )
    {
      blog.pic4= this.pic4;
    }
    else if( blog.pic4 == null )
    {
      blog.pic4 = "";
    }

    if( this.pic5 != null )
    {
      blog.pic5= this.pic5;
    }
    else if( blog.pic5 == null )
    {
      blog.pic5 = "";
    }

    if( this.pic6 != null )
    {
      blog.pic6= this.pic6;
    }
    else if( blog.pic6 == null )
    {
      blog.pic6 = "";
    }
  }

  addPic( type: number )
  {
    this.imageService.uploadFile().then(({image, orientation}) => {
      this.imageService.compressFile(image, orientation, 70, 70).then(
        result => {
          switch (type) {
            case 0:
              this.coverPic = result;
              this.coverPicButton = "success";
              break;
            case 1:
              this.pic1 = result;
              this.pic1Button = "success"
              break;
            case 2:
              this.pic2 = result;
              this.pic2Button = "success"
              break;
            case 3:
              this.pic3 = result;
              this.pic3Button = "success"
              break;
            case 4:
              this.pic4 = result;
              this.pic4Button = "success"
              break;
            case 5:
              this.pic5 = result;
              this.pic5Button = "success"
              break;
            case 6:
              this.pic6 = result;
              this.pic6Button = "success"
              break;
          }
        }
      );
    });
  }

  getCoverButtonColor():string
  {
    return this.coverPicButton.toString();
  }

  initFormControls()
  {
    let title;
    let subtitle;
    let description;
    let type;
    let blogData:BlogData = this.firebaseService.getSelectedBlog();
    console.log("Selected Blog ",blogData);
    if( blogData != undefined && blogData != null ){
      this.updateBlog = true;
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

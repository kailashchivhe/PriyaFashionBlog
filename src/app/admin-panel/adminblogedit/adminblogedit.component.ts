import { Component, OnInit } from '@angular/core';
import { BlogsService } from 'src/app/sharedServices/firebaseService/blogs.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BlogData } from 'src/app/model/BlogData';
import { NgxImageCompressService } from 'ngx-image-compress';
import { ToastrService } from 'ngx-toastr';
import { AngularFireStorage } from 'angularfire2/storage';

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

  updateBlog:boolean = false;

  constructor(private route: ActivatedRoute,
    private firebaseService: BlogsService,
    private imageService:NgxImageCompressService,
    private angularFireStorage:AngularFireStorage,
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

  addPicToStorage( event:any, type: number )
  {
    if( event.target.files && event.target.files[0] ) {
      let file = event.target.files[0];
      var reader = new FileReader();
      reader.onload = (event: any) => {
        let localUrl = event.target.result;
        this.uploadPicToStorage( localUrl, file , type );
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  uploadPicToStorage( localUrl: string, file: File, type:number )
  {
      this.imageService.compressFile( localUrl, -1, 70, 70 ).then( async compressedImage=>{
      // let result = await this.uploadFile( event.target.files.item(0), this.blogForm.get('title').value );
      const imageBlob = this.dataURItoBlob(compressedImage.split(',')[1]);
      let imageFile:File = new File( [imageBlob], file.name, { type: 'image/jpeg' } );
      let firebaseStoragePath = `blogs/${this.blogForm.get('title').value}/${file.name}`;
      let result = await this.uploadFile( imageFile, firebaseStoragePath );
      switch (type) 
      {
        case 0:
          this.coverPic = result.toString();
          break;
        case 1:
          this.pic1 = result.toString();
          break;
        case 2:
          this.pic2 = result.toString();
          break;
        case 3:
          this.pic3 = result.toString();
          break;
        case 4:
          this.pic4 = result.toString();
          break;
        case 5:
          this.pic5 = result.toString();
          break;
        case 6:
          this.pic6 = result.toString();
          break;
      }
    });
  }

  dataURItoBlob(dataURI) {
    const byteString = window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
    int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: 'image/jpeg' });
    return blob;
  }

  initFormControls()
  {
    let title;
    let subtitle;
    let description;
    let type;
    let blogData:BlogData = this.firebaseService.getSelectedBlog();
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
  
  uploadFile( file:File, firebaseStoragePath:string )
  {
    return new Promise((resolve,reject)=>{
      this.angularFireStorage.upload( firebaseStoragePath, file).then(rst => {
        rst.ref.getDownloadURL().then(url => {
            resolve(url);
        });
      });
    });
  }      

}

import { Component, OnInit } from '@angular/core';
import { BlogsService } from 'src/app/sharedServices/firebaseService/blogs.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
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

  constructor(private route: ActivatedRoute,
    private firebaseService: BlogsService,private imageService:NgxImageCompressService,
    private router: Router) { }

  ngOnInit() {
    this.initFormControls();
    this.firebaseService.getAllBlogs();
  }

  onSubmit() 
  {
    this.onCancel();
  }

  onAddBlog() 
  {
  }

  onDeleteBook(index: number) 
  {

  }

  onCancel() 
  {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  private initForm() 
  {
  }

  addBlog(){
    let blogData:BlogData = {
      type: this.blogForm.get('type').value,
      title: this.blogForm.get('title').value,
      subtitle: this.blogForm.get('subtitle').value,
      description: this.blogForm.get('description').value,
      coverPhoto: this.coverPic,
      pic1: this.pic1,
      pic2: this.pic2,
      pic3: this.pic3
    }
    this.firebaseService.pushData(blogData);
    alert("Upload Success");
    this.initFormControls();
  }

  addCoverPic()
  {
    this.imageService.uploadFile().then(({image, orientation}) => {
    
      this.imageService.compressFile(image, orientation, 40, 40).then(
        result => {
          this.coverPic = result
          console.warn('Size in bytes is now:', this.imageService.byteCount(result));
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
          console.warn('Size in bytes is now:', this.imageService.byteCount(result));
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
          console.warn('Size in bytes is now:', this.imageService.byteCount(result));
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
          console.warn('Size in bytes is now:', this.imageService.byteCount(result));
        }
      );
      
    });
  }

  initFormControls()
  {
    let title = '';
    let subtitle = '';
    let description = '';
    let type;

    this.blogForm = new FormGroup({
      'title': new FormControl(title),
      'subtitle': new FormControl(subtitle),
      'type': new FormControl(type),
      'description': new FormControl(description),
    });
  }
  
}

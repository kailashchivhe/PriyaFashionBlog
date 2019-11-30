import { Component, OnInit } from '@angular/core';
import { BlogsService } from 'src/app/firebaseService/blogs.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Upload } from 'src/app/model/Upload';
import { FormGroup, FormControl } from '@angular/forms';
import { BlogData } from 'src/app/model/BlogData';

@Component({
  selector: 'app-adminblogedit',
  templateUrl: './adminblogedit.component.html',
  styleUrls: ['./adminblogedit.component.scss']
})
export class AdminblogeditComponent implements OnInit {
  id: number;
  editMode = false;
  blogForm: FormGroup;
  coverPic: File;
  pic1: File;
  pic2: File;
  pic3: File;

  constructor(private route: ActivatedRoute,
    private firebaseService: BlogsService,
    private router: Router) { }

  ngOnInit() {
    this.initFormControls();
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
  // coverPicFile: File;
  // pic1File: File;
  // pic2File: File;
  // pic3File: File;
  // currentUpload: Upload;

  detectFiles(event) {
    // this.selectedFiles = event.target.files;
  }

  uploadSingle(file : File) {
    // let file = this.selectedFiles.item(0)
    
    // this.currentUpload = new Upload(file);
    // this.firebaseService.uploadData(this.currentUpload)
  }

  addBlog(){
    let blogData:BlogData = {
      type: this.blogForm.get('type').value,
      title: this.blogForm.get('title').value,
      subtitle: this.blogForm.get('subtitle').value,
      time: new Date().toString(),
      description: this.blogForm.get('description').value,
      coverPhoto: "",
      pic1: "",
      pic2: "",
      pic3: "",
      coverPhotoFile: this.coverPic,
      pic1File: this.pic1,
      pic2File: this.pic2,
      pic3File: this.pic3
    }
    this.firebaseService.uploadBlog( blogData );
  }

  addCoverPic(event)
  {
    this.coverPic = event.target.files.item(0);
  }
  addPic1(event)
  {
    this.pic1 = event.target.files.item(0);
  }
  addPic2(event)
  {
    this.pic2 = event.target.files.item(0);
  }
  addPic3(event)
  {
    this.pic3 = event.target.files.item(0);
  }

  initFormControls()
  {
    let title = '';
    let subtitle = '';
    let description = '';
    let type;
    let coverPic;
    let pic1;
    let pic2;
    let pic3;

    this.blogForm = new FormGroup({
      'title': new FormControl(title),
      'subtitle': new FormControl(subtitle),
      'type': new FormControl(type),
      'coverPic': new FormControl(coverPic),
      'pic1': new FormControl(pic1),
      'pic2': new FormControl(pic2),
      'pic3': new FormControl(pic3),
      'description': new FormControl(description),
    });
  }
  
}

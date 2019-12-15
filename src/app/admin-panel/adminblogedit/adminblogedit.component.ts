import { Component, OnInit } from '@angular/core';
import { BlogsService } from 'src/app/sharedServices/firebaseService/blogs.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { BlogData } from 'src/app/model/BlogData';
import { Upload } from 'src/app/model/Upload';
import { FileTypeEnum } from 'src/app/model/FileTypeEnum';
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
  coverPic: File;
  pic1: File;
  pic2: File;
  pic3: File;

  constructor(private route: ActivatedRoute,
    private firebaseService: BlogsService,
    private router: Router, private firebaseStorage: AngularFireStorage) { }

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
    this.uploadData(blogData);
  }

  async uploadData(blogData:BlogData)
  {
    let path = `blogs/${blogData.title}/`;
    let uploadList = [ new Upload(blogData.coverPhotoFile,FileTypeEnum.COVER_PIC,path),
      new Upload(blogData.pic1File,FileTypeEnum.PIC_ONE,path),
      new Upload(blogData.pic2File,FileTypeEnum.PIC_TWO,path),
      new Upload(blogData.pic3File,FileTypeEnum.PIC_THREE,path),
     ];
     for( let upload of uploadList )
     {
       let downloadURL = await this.uploadFile(upload);
       if( upload.fileType == FileTypeEnum.COVER_PIC )
       {
          blogData.coverPhoto = downloadURL.toString();
       }
       else if( upload.fileType == FileTypeEnum.PIC_ONE )
       {
          blogData.pic1 = downloadURL.toString();
       }
       else if( upload.fileType == FileTypeEnum.PIC_TWO )
       {
          blogData.pic2 = downloadURL.toString();
       }
       else if( upload.fileType == FileTypeEnum.PIC_THREE )
       {
        blogData.pic3 = downloadURL.toString();
       }
     }
     this.firebaseService.pushData(blogData);
     alert("Upload Success");
     this.initForm();
  }

  uploadFile( upload:Upload )
  {
    return new Promise((resolve,reject)=>{
      this.firebaseStorage.upload(upload.basePath.concat(upload.file.name), upload.file).then(rst => {
        rst.ref.getDownloadURL().then(url => {
            resolve(url);
        });
      });
    });      
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

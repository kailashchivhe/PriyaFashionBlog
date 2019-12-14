import { Injectable, ɵNOT_FOUND_CHECK_ONLY_ELEMENT_INJECTOR } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Upload } from '../../model/Upload';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { finalize, tap } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { IBlogs } from '../../model/IBlogs';
import { BlogData } from '../../model/BlogData';
import { FileTypeEnum } from '../../model/FileTypeEnum';

@Injectable({
  providedIn: 'root'
})
export class BlogsService {
  // blogs: AngularFireList<any>;
  static blogs: AngularFireList<any>;
  task: AngularFireUploadTask;
  downloadURL: any;
  url:String;
  constructor(private firebase:AngularFireDatabase, private firebaseStorage: AngularFireStorage) { 
    // this.init();
    // this.blogs = this.firebase.list('blogs/');
  }

  init()
  {
    BlogsService.blogs = this.firebase.list('blogs/');
  }

  getAllBlogs()
  {
    return BlogsService.blogs;
  }

  // uploadData( upload: Upload )
  // {
    // this.task = this.firebaseStorage.upload( "uploads/", upload.file );
    // const ref = this.firebaseStorage.ref("uploads/");
    // this.task.snapshotChanges().pipe(
    //   finalize(() => {
    //     ref.getDownloadURL().subscribe(function(url: any){
    //       if(url)
    //       {
    //         this.url = url;
    //         BlogsService.pushData(this.url);
    //       }
    //     });
    //   }
    // )).subscribe();
    // this.task = this.firebaseStorage.upload( upload.file.name, upload.file );
    // const ref = this.firebaseStorage.ref(upload.file.name);
    // this.task.snapshotChanges().pipe(
    //   finalize(() => {
    //     ref.getDownloadURL().subscribe(function(url: any){
    //       if(url)
    //       {
    //         this.url = url;
    //       }
    //     });
    //   }
    // )).subscribe();
  // }

  uploadBlog( blogData: BlogData )
  {
    // this.firebaseStorage.upload( blogData.coverPhotoFile.name, blogData.coverPhotoFile );
    // this.firebaseStorage.upload( blogData.pic1File.name, blogData.pic1File );
    // this.firebaseStorage.upload( blogData.pic2File.name, blogData.pic2File );
    // this.firebaseStorage.upload( blogData.pic3File.name, blogData.pic3File );

    // let uploadCoverPic = new Upload( blogData.coverPhotoFile );
    // let uploadPic1 = new Upload( blogData.pic1File );
    // let uploadPic2 = new Upload( blogData.pic2File );
    // let uploadPic3 = new Upload( blogData.pic3File );
    // this.uploadData(uploadCoverPic);
    // this.uploadData(uploadPic1);
    // this.uploadData(uploadPic2);
    // this.uploadData(uploadPic3);
    // await this.uploadData( uploadCoverPic, blogData.title, "coverPic" );
    let path = `blogs/${blogData.title}/`;
    
    this.firebaseStorage.upload( path.concat(blogData.coverPhotoFile.name), blogData.coverPhotoFile );
    this.firebaseStorage.upload( path.concat(blogData.pic1File.name), blogData.pic1File );
    this.firebaseStorage.upload( path.concat(blogData.pic2File.name), blogData.pic2File );
    this.firebaseStorage.upload( path.concat(blogData.pic3File.name), blogData.pic3File );
    let upload = [ new Upload(blogData.coverPhotoFile,FileTypeEnum.COVER_PIC),
       new Upload(blogData.pic1File,FileTypeEnum.PIC_ONE),
       new Upload(blogData.pic2File,FileTypeEnum.PIC_TWO),
       new Upload(blogData.pic3File,FileTypeEnum.PIC_THREE),
      ];
    this.uploadData(upload,path,blogData);
  }

  uploadData( uploadlist:Upload[],path:string,blogData:BlogData)
  {
    for(let upload of uploadlist)
    {
      const ref = this.firebaseStorage.ref(path.concat(upload.file.name));
      ref.getDownloadURL().subscribe(function(url){
        upload.url = url;
      });
    }
    for(let upload of uploadlist)
    {
      switch(upload.fileType)
      {
        case FileTypeEnum.COVER_PIC:
        {
          blogData.coverPhoto = upload.url;
          break;
        }
        case FileTypeEnum.PIC_ONE:
        {
          blogData.pic1 = upload.url;
          break;
        }
        case FileTypeEnum.PIC_TWO:
        {
          blogData.pic2 = upload.url;
          break;
        }
        case FileTypeEnum.PIC_THREE:
        {
          blogData.pic3 = upload.url;
          break;
        }  
      }
    }
    BlogsService.pushData(blogData);
  }

  static pushData( blogData : BlogData )
  {
    let blog:IBlogs = ({
      title : blogData.title,
      subtitle : blogData.subtitle,
      description : blogData.description,
      pic1 : blogData.pic1,
      pic2 : blogData.pic2,
      pic3 : blogData.pic3,
      coverPhoto : blogData.coverPhoto,
      time : blogData.time,
      type: blogData.type
    })
    BlogsService.blogs.push(blog)
  }
}

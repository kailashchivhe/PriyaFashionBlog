import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxImageCompressService } from 'ngx-image-compress';
import { AngularFireStorage } from 'angularfire2/storage';
import { ToastrService } from 'ngx-toastr';
import { HeaderImagesUploadService } from 'src/app/sharedServices/firebaseService/header-images-upload.service';

@Component({
  selector: 'app-upload-header-images',
  templateUrl: './upload-header-images.component.html',
  styleUrls: ['./upload-header-images.component.scss']
})
export class UploadHeaderImagesComponent implements OnInit {

  bUploadFileInputDisabled = false;
  bUploadButtonDisabled = true;
  uploadPic:String;
  uploadPicType:number;

  constructor(private route: ActivatedRoute,
    private firebaseService: HeaderImagesUploadService,
    private imageService:NgxImageCompressService,
    private angularFireStorage:AngularFireStorage,
    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit() {
  }

  uploadHeaderImages(){
    this.firebaseService.updatePic(this.uploadPic,this.uploadPicType);
    this.toastr.warning("Updated Pic Success",'Image Updated');
    this.router.navigateByUrl("/admin/panel")
  }

  addPicToStorage( event:any )
  {
    if( this.uploadPicType>=1 && this.uploadPicType<=8 )
    {
      if( event.target.files && event.target.files[0] ) {
        let file = event.target.files[0];
        var reader = new FileReader();
        reader.onload = (event: any) => {
          let localUrl = event.target.result;
          this.uploadPicToStorage( localUrl, file );
        }
        reader.readAsDataURL(event.target.files[0]);
      }
    }
  }

  onClicked(value: any){
    switch(value){
      case "slidingPic1":
        this.uploadPicType = 1
        break;
      case "slidingPic2":
        this.uploadPicType = 2
        break;
      case "slidingPic3":
        this.uploadPicType = 3
        break;
      case "slidingPic4":
        this.uploadPicType = 4
        break;
      case "fashionPic":
        this.uploadPicType = 5
        break; 
      case "foodPic":
        this.uploadPicType = 6
        break;
      case "beautyPic":
        this.uploadPicType = 7
        break;
      case "travelPic":
        this.uploadPicType = 8
        break;       
    }
    this.bUploadFileInputDisabled = true;
  }

  uploadPicToStorage( localUrl: string, file: File )
  {
    let firebaseStoragePath: string;
    switch (this.uploadPicType) 
    {
        case 1:
          firebaseStoragePath = `blogsHeaderPics/slidingPics/slidingPic1`;
          break;
        case 2:
          firebaseStoragePath = `blogsHeaderPics/slidingPics/slidingPic2`;
          break;
        case 3:
          firebaseStoragePath = `blogsHeaderPics/slidingPics/slidingPic3`;
          break;
        case 4:
          firebaseStoragePath = `blogsHeaderPics/slidingPics/slidingPic4`;
          break;
        case 5:
          firebaseStoragePath = `blogsHeaderPics/slidingPics/fashionPic`;
          break;
        case 6:
          firebaseStoragePath = `blogsHeaderPics/slidingPics/foodPic`;
          break;
        case 7:
          firebaseStoragePath = `blogsHeaderPics/slidingPics/beautyPic`;
          break;
        case 8:
          firebaseStoragePath = `blogsHeaderPics/slidingPics/travelPic`;
          break;
    }
    this.imageService.compressFile( localUrl, -1, 70, 70 ).then( async compressedImage=>{
      const imageBlob = this.dataURItoBlob(compressedImage.split(',')[1]);
      let imageFile:File = new File( [imageBlob], file.name, { type: 'image/jpeg' } );
      let result = await this.uploadFile( imageFile, firebaseStoragePath );
      this.uploadPic = result.toString();
      this.bUploadButtonDisabled = false;
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

  isUploadInputVisible(){
    return this.bUploadFileInputDisabled;
  }

  isUploadButtonDisabled(){
    return this.bUploadButtonDisabled;
  }
}

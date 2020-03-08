import { Component, OnInit } from '@angular/core';
import { HeaderImagesUploadService } from '../sharedServices/firebaseService/header-images-upload.service';
import { HeaderImageCallback } from '../model/HeaderImageCallback';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnInit,HeaderImageCallback {
  public slides:string[];

  constructor( private headerImageService:HeaderImagesUploadService) { }

  ngOnInit() {
    this.headerImageService.getSlidingImages( this );
  }

  allImagesReceived(images: string[]) {
    this.slides = [];
    for( var image of images )
    {
      this.slides.push(image);
    }
  }

  contentSpecificHeader(image: string) {}
}

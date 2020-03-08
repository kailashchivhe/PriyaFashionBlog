import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { HeaderImageCallback } from 'src/app/model/HeaderImageCallback';

@Injectable({
  providedIn: 'root'
})
export class HeaderImagesUploadService {
  private slidingImages: AngularFireList<any>;
  private blogTypeHeaderImage: AngularFireList<any>;
  private slidingImageURLs:string[];
  private fashionHeaderImageURL:string;
  private foodHeaderImageURL:string;
  private beautyHeaderImageURL:string;
  private travelHeaderImageURL:string;

  constructor(private firebase:AngularFireDatabase) { }

  getSlidingImages( headerImageCallback: HeaderImageCallback )
  {
    if( this.slidingImageURLs == null || this.slidingImageURLs.length <= 0 )
    {
      this.slidingImages = this.firebase.list('blogsHeaderPics/slidingPics/');
      this.slidingImages.snapshotChanges().subscribe(item => {
        this.slidingImageURLs = [];
        item.forEach(element => {
          var y = element.payload.toJSON();
          this.slidingImageURLs.push(y as string);
        })
        headerImageCallback.allImagesReceived(this.slidingImageURLs);
      });
    }
    else
    {
      headerImageCallback.allImagesReceived(this.slidingImageURLs);
    }
  }

  getContentHeaderImage(type:number, headerImageCallback:HeaderImageCallback)
  {
    switch(type)
    {
      case 1:
      {
        this.blogTypeHeaderImage = this.firebase.list('blogsHeaderPics/fashionPic/')
        if( this.fashionHeaderImageURL == null || this.fashionHeaderImageURL.length <= 0 )
        {
          this.setDataAndCallback( this.blogTypeHeaderImage, this.fashionHeaderImageURL, headerImageCallback );
        }
        else
        {
          headerImageCallback.contentSpecificHeader(this.fashionHeaderImageURL);
        }
        break;
      }
      case 2:
      {
        this.blogTypeHeaderImage = this.firebase.list('blogsHeaderPics/foodPic/')
        if( this.foodHeaderImageURL == null || this.foodHeaderImageURL.length <= 0 )
        {
          this.setDataAndCallback( this.blogTypeHeaderImage, this.foodHeaderImageURL, headerImageCallback );
        }
        else
        {
          headerImageCallback.contentSpecificHeader(this.foodHeaderImageURL);
        }
        break;
      }
      case 3:
      {
        this.blogTypeHeaderImage = this.firebase.list('blogsHeaderPics/beautyPic/')
        if( this.beautyHeaderImageURL == null || this.beautyHeaderImageURL.length <= 0 )
        {
          this.setDataAndCallback( this.blogTypeHeaderImage, this.beautyHeaderImageURL, headerImageCallback );
        }
        else
        {
          headerImageCallback.contentSpecificHeader(this.beautyHeaderImageURL);
        }
        break;
      }
      case 4:
      {
        this.blogTypeHeaderImage = this.firebase.list('blogsHeaderPics/travelPic/')
        if( this.travelHeaderImageURL == null || this.travelHeaderImageURL.length <= 0 )
        {
          this.setDataAndCallback( this.blogTypeHeaderImage, this.travelHeaderImageURL, headerImageCallback );
        }
        else
        {
          headerImageCallback.contentSpecificHeader(this.travelHeaderImageURL);
        }
        break;
      }
    }
  }

  private setDataAndCallback( blogTypeSubscriber: AngularFireList<any>, imageURL: string, headerImageCallback: HeaderImageCallback )
  {
    this.blogTypeHeaderImage.snapshotChanges().subscribe(item => {
      this.slidingImageURLs = [];
      item.forEach(element => {
        var y = element.payload.toJSON();
        imageURL = y as string;
      })
      headerImageCallback.contentSpecificHeader(imageURL);
    });
  }

  updatePic(url : String,type:number){
    switch(type)
    {
      case 1:
      this.firebase.object('blogsHeaderPics/slidingPics/').update({
        slidingPic1:url});
      break;
      case 2:
        this.firebase.object('blogsHeaderPics/slidingPics/').update({
          slidingPic2:url})
      break;
      case 3:
        this.firebase.object('blogsHeaderPics/slidingPics/').update({
          slidingPic3:url})
      break;
      case 4:
        this.firebase.object('blogsHeaderPics/slidingPics/').update({
          slidingPic4:url})
      break;
      case 5:
        this.firebase.object('blogsHeaderPics/fashionPic/').update({
          fashionPic:url})
      break;
      case 6:
        this.firebase.object('blogsHeaderPics/foodPic/').update({
          foodPic:url})
      break;
      case 7:
        this.firebase.object('blogsHeaderPics/beautyPic/').update({
          beautyPic:url})
      break;
      case 8:
        this.firebase.object('blogsHeaderPics/travelPic/').update({
          travelPic:url})
      break;
    }
  }
}

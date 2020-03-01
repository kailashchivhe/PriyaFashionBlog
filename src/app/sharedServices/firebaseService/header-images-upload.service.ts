import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class HeaderImagesUploadService {
  slidingImages: AngularFireList<any>;
  blogTypeHeaderImage: AngularFireList<any>;
  constructor(private firebase:AngularFireDatabase) { }

  getSlidingImages()
  {
    this.slidingImages = this.firebase.list('blogsHeaderPics/slidingPics/');
    return this.slidingImages;
  }

  getFashionHeaderImage(type:number)
  {
    switch(type)
    {
      case 1:
      this.blogTypeHeaderImage = this.firebase.list('blogsHeaderPics/fashionPic/')
      break;
      case 2:
      this.blogTypeHeaderImage = this.firebase.list('blogsHeaderPics/foodPic/')
      break;
      case 3:
      this.blogTypeHeaderImage = this.firebase.list('blogsHeaderPics/beautyPic/')
      break;
      case 4:
      this.blogTypeHeaderImage = this.firebase.list('blogsHeaderPics/travelPic/')
      break;
    }
    return this.blogTypeHeaderImage;
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

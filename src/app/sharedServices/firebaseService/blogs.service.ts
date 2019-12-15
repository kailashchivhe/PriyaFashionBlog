import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireStorage } from 'angularfire2/storage';
import { BlogData } from '../../model/BlogData';

@Injectable({
  providedIn: 'root'
})
export class BlogsService {
  blogs: AngularFireList<any>;
  constructor(private firebase:AngularFireDatabase, private firebaseStorage: AngularFireStorage) {}

  init()
  {
    this.blogs = this.firebase.list('blogs/');
  }

  getAllBlogs()
  {
    if( this.blogs == null )
    {
        this.init();
    }
    return this.blogs;
  }

  pushData(blogData:BlogData)
  {
    this.blogs.push({
      type: blogData.type,
      title: blogData.title,
      subtitle: blogData.subtitle,
      description: blogData.description,
      coverPhoto: blogData.coverPhoto,
      pic1: blogData.pic1,
      pic2: blogData.pic2,
      pic3: blogData.pic3
    });
  }
}
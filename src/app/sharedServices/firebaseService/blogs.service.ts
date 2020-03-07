import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { BlogData } from '../../model/BlogData';

@Injectable({
  providedIn: 'root'
})
export class BlogsService {
  blogsList: AngularFireList<any>;
  latestBlogsList: AngularFireList<any>;
  blogFamily:AngularFireList<any>;
  selectedBlog : BlogData;
  constructor(private firebase:AngularFireDatabase) {}
  
  getAllBlogs()
  {
    if( this.blogsList == null  || this.blogsList == undefined )
    {
      console.log("Server data getAllBlogs");
      this.blogsList = this.firebase.list('blogs/');
    }
    return this.blogsList;
  }

  getLatestBlogs()
  {
    if( this.latestBlogsList == null || this.latestBlogsList == undefined )
    {
      console.log("Server data getLatestBlogs");
      this.latestBlogsList = this.firebase.list('blogs/',ref => ref.limitToLast(3));
    }
    return this.latestBlogsList;
  }

  getBlogFamily()
  {
    if( this.blogFamily == null || this.blogFamily == undefined )
    {
      console.log("Server data getBlogFamily");
      this.blogFamily = this.firebase.list('blogFamily/');
    }
    return this.blogFamily;
  }

  addBlogFamily(blogFamilyMemberDetail:any)
  {
    this.blogFamily.push(blogFamilyMemberDetail);
  }

  pushData(blogData:any)
  {
    this.blogsList.push(blogData);
  }
  
  updateBlog(blogData : BlogData){
    let key = blogData.$key;
    delete blogData.$key;
    this.firebase.object('blogs/'+key).update({
      type:blogData.type,
      title: blogData.title,
      subtitle: blogData.subtitle,
      description: blogData.description,
      coverPhoto: blogData.coverPhoto,
      pic1: blogData.pic1,
      pic2: blogData.pic2,
      pic3: blogData.pic3,
      pic4: blogData.pic4,
      pic5: blogData.pic5,
      pic6: blogData.pic6,
    });
    this.selectedBlog = null;
  }

  deleteBlog(key : string ){
    this.blogsList.remove(key);
  }

  getSelectedBlog()
  {
    return this.selectedBlog;
  }

  setSelectedBlog(blog:BlogData)
  {
    this.selectedBlog = blog;
  }

  clearSelectedBlog()
  {
    this.selectedBlog = null;
  }

}

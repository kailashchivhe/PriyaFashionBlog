import { Component, OnInit, OnDestroy } from '@angular/core';
import { BlogsService } from 'src/app/sharedServices/firebaseService/blogs.service';
import { Router, ActivatedRoute } from '@angular/router';
import { BlogData } from 'src/app/model/BlogData';
import { FirebaseCallback } from 'src/app/model/firebaseCallback';
import { AuthService } from 'src/app/sharedServices/authService/auth.service';

@Component({
  selector: 'app-adminbloglist',
  templateUrl: './adminbloglist.component.html',
  styleUrls: ['./adminbloglist.component.scss']
})
export class AdminbloglistComponent implements OnInit,FirebaseCallback {
  latestPosts: BlogData[];
  bShowloader:boolean = true;
  
  constructor(private firebaseService: BlogsService,
    private router: Router,private _authService:AuthService,
    private route: ActivatedRoute) { }

  onDataReceived(blogList: BlogData[],bServerData:boolean) {
      this.bShowloader = false;
      if( bServerData )
      { 
       this.latestPosts = blogList.reverse();
      }
      else
      {
        this.latestPosts = blogList;
      }
  }

  ngOnInit() {
    this.bShowloader = true;
    this.firebaseService.getBlogsData( this );
  }

  onNewProject() 
  {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  displayFamDetails() 
  {
    this.router.navigate(['famdetails'], {relativeTo: this.route});
  }

  editBlog(post:BlogData){
    this.firebaseService.setSelectedBlog(post);
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  deleteBlog(post:BlogData){
    this.firebaseService.deleteBlog(post.$key);
  }

  uploadHeaderImages(){
    this.router.navigate(['updateslide'], {relativeTo: this.route});
  }

  logout()
  {
    this._authService.logoutUser();
  }
}

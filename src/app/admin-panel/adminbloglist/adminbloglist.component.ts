import { Component, OnInit, OnDestroy } from '@angular/core';
import { BlogsService } from 'src/app/sharedServices/firebaseService/blogs.service';
import { Router, ActivatedRoute } from '@angular/router';
import { BlogData } from 'src/app/model/BlogData';
import { AuthService } from 'src/app/sharedServices/authService/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-adminbloglist',
  templateUrl: './adminbloglist.component.html',
  styleUrls: ['./adminbloglist.component.scss']
})
export class AdminbloglistComponent implements OnInit,OnDestroy {
  latestPosts: BlogData[];
  bShowloader:boolean = true;
  subscribe:Subscription;
  
  constructor(private firebaseService: BlogsService,
    private router: Router,private _authService:AuthService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    var data = this.firebaseService.getAllBlogs();
    this.subscribe = data.snapshotChanges().subscribe(item => {
      this.latestPosts = [];
      item.forEach(element => {
        var y = element.payload.toJSON();
        y["$key"] = element.key;
        this.latestPosts.push(y as BlogData);
      })
      this.bShowloader = false;
    });
  }
  
  ngOnDestroy(): void {
    this.subscribe.unsubscribe();
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

  logout()
  {
    this._authService.logoutUser();
  }


}

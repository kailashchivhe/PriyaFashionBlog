import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BlogsService } from 'src/app/sharedServices/firebaseService/blogs.service';
import { Router, ActivatedRoute } from '@angular/router';
import { BlogData } from 'src/app/model/BlogData';

@Component({
  selector: 'app-adminbloglist',
  templateUrl: './adminbloglist.component.html',
  styleUrls: ['./adminbloglist.component.scss']
})
export class AdminbloglistComponent implements OnInit {
  latestPosts: BlogData[];
  bShowloader:boolean = true;
  constructor(private firebaseService: BlogsService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    var data = this.firebaseService.getAllBlogs();
    data.snapshotChanges().subscribe(item => {
      this.latestPosts = [];
      item.forEach(element => {
        var y = element.payload.toJSON();
        y["$key"] = element.key;
        this.latestPosts.push(y as BlogData);
      })
      this.bShowloader = false;
    })
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
}

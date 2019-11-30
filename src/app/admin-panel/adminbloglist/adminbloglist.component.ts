import { Component, OnInit } from '@angular/core';
import { IBlogs } from 'src/app/model/IBlogs';
import { Subscription } from 'rxjs';
import { BlogsService } from 'src/app/firebaseService/blogs.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-adminbloglist',
  templateUrl: './adminbloglist.component.html',
  styleUrls: ['./adminbloglist.component.scss']
})
export class AdminbloglistComponent implements OnInit {
  pro: IBlogs[];
  subscription: Subscription;
  constructor(private firebaseService: BlogsService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
  }
  ngOnDestroy() 
  {
    this.subscription.unsubscribe();
  }

  // Listener to add new project
  onNewProject() 
  {
    this.router.navigate(['new'], {relativeTo: this.route});
  }
}

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
  pro: BlogData[];
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

import { Component, OnInit } from '@angular/core';
import { BlogsService } from 'src/app/sharedServices/firebaseService/blogs.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-adminblogdetail',
  templateUrl: './adminblogdetail.component.html',
  styleUrls: ['./adminblogdetail.component.scss']
})
export class AdminblogdetailComponent implements OnInit {

  constructor(private firebaseService: BlogsService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
  }

  onAddToShoppingList() 
  {

  }

  // Listener to edit the project
  onEditProject() 
  {
    this.router.navigate(['edit'], {relativeTo: this.route});
   }

   // Listener to delete the project
  onDeleteProject() 
  {
    this.router.navigate(['/admin']);
  }
}

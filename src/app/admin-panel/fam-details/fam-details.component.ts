import { Component, OnInit } from '@angular/core';
import { BlogFamily } from 'src/app/model/BlogFamily';
import { BlogsService } from 'src/app/sharedServices/firebaseService/blogs.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-fam-details',
  templateUrl: './fam-details.component.html',
  styleUrls: ['./fam-details.component.scss']
})
export class FamDetailsComponent implements OnInit {
  famDetailsList:BlogFamily[];
  bShowloader: boolean = true;
  subscribe:Subscription;

  constructor(private firebaseService:BlogsService) { }
  
  ngOnInit() {
    var data = this.firebaseService.getBlogFamily();
    this.subscribe=data.snapshotChanges().subscribe(item => {
      this.famDetailsList = [];
      item.forEach(element => {
        var y = element.payload.toJSON();
        y["$key"] = element.key;
        this.famDetailsList.push(y as BlogFamily);
      })
      this.bShowloader = false;
    })
  }

  ngOnDestroy(): void {
    this.subscribe.unsubscribe();
  }
  
}

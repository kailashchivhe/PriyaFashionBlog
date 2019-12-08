import { Component, OnInit } from '@angular/core';
import { BlogsService } from '../firebaseService/blogs.service';
import { InstaServiceService } from '../instaservice/insta-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public slides=[ '../assets/images/cover_photo_final.jpg','../assets/images/facebook1.jpg','../assets/images/facebook2.jpg']
  
  constructor( private blogsService:BlogsService) { }

  ngOnInit() {
    
  }
}

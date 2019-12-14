import { Component, OnInit } from '@angular/core';
import { BlogsService } from '../sharedServices/firebaseService/blogs.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnInit {
  public slides=[ '../assets/images/cover_photo_final.jpg',
  '../assets/images/facebook1.jpg',
  '../assets/images/facebook2.jpg',
  '../assets/images/beauty_2.jpg']
  
  constructor( private blogsService:BlogsService) { }

  ngOnInit() {
    
  }
}

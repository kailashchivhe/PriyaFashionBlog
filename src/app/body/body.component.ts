import { Component, OnInit } from '@angular/core';
import { BlogsService } from '../sharedServices/firebaseService/blogs.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnInit {
  public slides=[ '../assets/images_data/caraousel/cover_pic_1.jpg',
  '../assets/images_data/caraousel/cover_pic_3.jpg',
  '../assets/images_data/caraousel/cover_pic_4.jpg',
  '../assets/images_data/caraousel/cover_pic_5.jpg']
  
  constructor( private blogsService:BlogsService) { }

  ngOnInit() {
    
  }
}

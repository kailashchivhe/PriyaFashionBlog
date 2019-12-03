import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blog-content',
  templateUrl: './blog-content.component.html',
  styleUrls: ['./blog-content.component.scss']
})
export class BlogContentComponent implements OnInit {
  slides=[ '../assets/images/facebook1.jpg','../assets/images/facebook2.jpg']
  constructor() { }

  ngOnInit() {
  }

}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lifestyle-list',
  templateUrl: '../generic-blog-list.html',
  styleUrls: ['../generic-blog-list.scss']
})
export class LifestyleListComponent implements OnInit{
  categoryName:String = "LIFESTYLE";
  constructor() {
  }

  ngOnInit() {
  }

}

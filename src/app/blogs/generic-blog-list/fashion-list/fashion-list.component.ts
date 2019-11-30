import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fashion-list',
  templateUrl: '../generic-blog-list.html',
  styleUrls: ['../generic-blog-list.scss']
})
export class FashionListComponent implements OnInit{
  categoryName:String = "FASHION";
  constructor() {
  }

  ngOnInit() {
  }

}

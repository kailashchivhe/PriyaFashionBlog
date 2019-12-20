import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-beauty-list',
  templateUrl: '../generic-blog-list.html',
  styleUrls: ['../generic-blog-list.scss']
})
export class BeautyListComponent implements OnInit{
  categoryName:String = "BEAUTY";
  constructor() {
  }

  ngOnInit() {
  }

  getUrl()
  {
    return "url('../../../../assets/images_data/beauty/beauty_cover_pic1.jpg')";
  }

}

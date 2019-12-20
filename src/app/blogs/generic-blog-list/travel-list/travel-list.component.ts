import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-travel-list',
  templateUrl: '../generic-blog-list.html',
  styleUrls: ['../generic-blog-list.scss']
})
export class TravelListComponent implements OnInit{
  categoryName:String = "TRAVEL";
  constructor() { 
  }

  ngOnInit() {
  }

  highlight(event){
    console.log("Hover working")
  }

  getUrl()
  {
    return "url('../../../../assets/images_data/travel/travel_cover_pic.jpg')";
  }
}

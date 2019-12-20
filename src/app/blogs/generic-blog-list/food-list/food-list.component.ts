import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-food-list',
  templateUrl: '../generic-blog-list.html',
  styleUrls: ['../generic-blog-list.scss']
})
export class FoodListComponent implements OnInit{
  categoryName:String = "Food";
  constructor() {
  }

  ngOnInit() {
  }

  getUrl()
  {
    return "url('../../../../assets/images_data/food/food_cover_pic.jpg')";
  }
}

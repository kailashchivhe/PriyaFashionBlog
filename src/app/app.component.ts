import { Component } from '@angular/core';
import {BlogConstants} from './model/BlogConstants'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'FashionBlog';

  getHeaderFooterColor(){
    // return "#fbceb1";
    return "#fee6d8";
  }
}

import { Component } from '@angular/core';
import {BlogConstants} from './model/BlogConstants'
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'FashionBlog';

  constructor(private router:Router){}
  
  getHeaderFooterColor(){
    // return "#fbceb1";
    return "#fee6d8";
  }

  onClick( url ){
    this.router.navigateByUrl(`${url}`);
  }
}

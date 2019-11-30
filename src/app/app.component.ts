import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'FashionBlog';
  slides=[ '../assets/images/cover_photo_final.jpg','../assets/images/facebook1.jpg','../assets/images/facebook2.jpg']
}

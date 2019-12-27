import { Component, OnInit } from '@angular/core';
import { InstaServiceService } from 'src/app/sharedServices/instaservice/insta-service.service';
import { filter } from 'rxjs/operators';
import { IData } from 'src/app/model/IData';

@Component({
  selector: 'app-instagram-updates',
  templateUrl: './instagram-updates.component.html',
  styleUrls: ['./instagram-updates.component.scss']
})
export class InstagramUpdatesComponent implements OnInit {
  public bShowloader = true;
  public instaData:IData;
  constructor(private instaService:InstaServiceService) { }
  
  ngOnInit() {
    this.instaService.getPosts().subscribe(data=>{
      this.instaData = data;
      this.bShowloader = false;
    });
  }

  navigateToInstagra()
  {
    window.open("https://www.instagram.com/flowerfairyofficial/?hl=en","_blanks")
  }

  ngOnDestroy()
  {
    this.instaService.getPosts().subscribe().unsubscribe();
  }
}

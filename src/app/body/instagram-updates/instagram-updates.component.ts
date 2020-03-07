import { Component, OnInit } from '@angular/core';
import { InstaServiceService } from 'src/app/sharedServices/instaservice/insta.service';
import { IEdges } from 'src/app/model/IEdges';

@Component({
  selector: 'app-instagram-updates',
  templateUrl: './instagram-updates.component.html',
  styleUrls: ['./instagram-updates.component.scss']
})
export class InstagramUpdatesComponent implements OnInit {
  public bShowloader = true;
  public instaImages=[];
  constructor(private instaService:InstaServiceService) { }
  
  ngOnInit() {
    this.instaService.getPosts().subscribe(data=>{
      let edges:IEdges[]= data.graphql.user.edge_owner_to_timeline_media.edges;
      let i = 0;
      for( var edge of edges )
      {
        if(!edge.node.is_video && i<6)
        {
          this.instaImages.push(edge.node.display_url);
          i++;
        }
      }
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

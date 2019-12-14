import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IData } from '../../model/IData';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InstaServiceService {
  private url:string  = "https://www.instagram.com/flowerfairyofficial/?__a=1"
  
  constructor(private http:HttpClient) { 
  }

  public getPosts():Observable<IData>
  {
    return this.http.get<IData>(this.url);
  }

  public parseData(data:any):any
  {
    let graphql = data["graphql"];
    let user = graphql["user"];
    let media = user["edge_owner_to_timeline_media"];
    let posts = media["edges"];
    let instagramImages = [];
    for(let i=0;i<3;)
    {
      let node = posts[i];
      if( node["is_video"] == false )
      {
        instagramImages.push(node["display_url"]);
        i++;
      }
    }
    console.log(graphql);
    return graphql;
  }
}

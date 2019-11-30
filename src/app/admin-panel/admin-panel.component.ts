import { Component, OnInit } from '@angular/core';
import { Upload } from '../model/Upload';
import { BlogsService } from '../firebaseService/blogs.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {
  constructor( private blogsService:BlogsService) { }

  ngOnInit() {
  }
}

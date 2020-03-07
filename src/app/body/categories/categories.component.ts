import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }
  
  onClick( url ){
    this.router.navigateByUrl(`${url}`);
  }
}

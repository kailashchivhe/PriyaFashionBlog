import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  subscribeForm: FormGroup;
  constructor() { }

  ngOnInit() {
    this.initFormControls();
  }

  joinFam()
  {

  }
  
  initFormControls()
  {
    let name = '';
    let email = '';
    let mobile = '';
    this.subscribeForm = new FormGroup({
      'name': new FormControl(name),
      'email': new FormControl(email),
      'mobile': new FormControl(mobile)
    });
  }
}

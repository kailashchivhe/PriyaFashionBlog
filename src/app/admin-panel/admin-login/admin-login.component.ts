import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/sharedServices/authService/auth.service';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {
  email:string;
  password:string;
  adminLoginForm:FormGroup;
  constructor(private _auth: AuthService,
    private _router: Router) { }

  ngOnInit() {
    let password='';
    let email='';

    this.adminLoginForm = new FormGroup({
      'email': new FormControl(email,Validators.required),
      'password': new FormControl(password,Validators.required)
    });
  }

  loginUser()
  {
    this._auth.loginUser( this.adminLoginForm.get('email').value, this.adminLoginForm.get('password').value );
    this._router.navigate(['admin/panel'])
  }
}

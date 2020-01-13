import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/sharedServices/authService/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {
  email:string;
  password:string;
  constructor(private _auth: AuthService,
    private _router: Router) { }

  ngOnInit() {
  }

  loginUser()
  {
    this._auth.loginUser( this.email,this.password );
    this._router.navigate(['admin/panel'])
  }
}

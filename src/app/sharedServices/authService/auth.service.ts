import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated():boolean {
    return true;
  }

  constructor(private _router:Router) { }

  logoutUser() {
    localStorage.removeItem('token')
    this._router.navigate(['/admin'])
  }

  loginUser( email, password )
  {
    if( email === "admin" && password === "admin" )
    {
      localStorage.setItem('token', "priyaHaridas@123");
    }
  }

  getToken() {
    return localStorage.getItem('token')
  }

  loggedIn() {
    return !!localStorage.getItem('token')    
  }
}

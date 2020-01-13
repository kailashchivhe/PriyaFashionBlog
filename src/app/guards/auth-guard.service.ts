import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../sharedServices/authService/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {
  constructor( private _authService: AuthService, private _router: Router) { }

  canActivate(): boolean {
    if (this._authService.loggedIn()) {
      return true
    } 
    else {            
      this._router.navigate(['/admin'])
      return false
    }
  }
}

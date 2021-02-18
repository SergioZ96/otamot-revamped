import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
/*
  CanActivate is an interface that a class can implement to be a guard deciding if a route can be activated
*/
export class AuthGuard implements CanActivate { 

  constructor(private router: Router, private authService: AuthService){

  }

  canActivate( next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree 
  {

    if (!this.authService.loggedIn()){
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }
  
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authToken: any;
  user: any;

  constructor(private http: HttpClient, public jwtHelper: JwtHelperService) { }

  registerUser(user){
    let httpOptions = { headers: new HttpHeaders({'Content-Type': 'application/json'})};
    return this.http.post<any>('http://localhost:3000/register', user, httpOptions);
  }

  authenticateUser(user){
    let httpOptions = { headers: new HttpHeaders({'Content-Type': 'application/json'})};
    return this.http.post<any>('http://localhost:3000/authenticate', user, httpOptions);
  }

  /* getProfile(){
    this.loadToken();

    return this.http.get<any>('http://localhost:3000/authenticate');
  } */

  loadToken(){
    const token = localStorage.getItem('jwt');
    this.authToken = token;
  }

  storeUserData(token, user){
    localStorage.setItem('jwt', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  loggedIn(){
    return !(this.jwtHelper.isTokenExpired());
  }
}

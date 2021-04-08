import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Chat } from '../interfaces/chat';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private _chats:Chat[] = [];

  username: any;

  constructor(private http: HttpClient, public jwtHelper: JwtHelperService) { }

  //For shared data with chats
  pushChat(chat:Chat) {
    this._chats.push(chat);
  }

  getChatlist() {
    return this._chats;
  }

  // For making requests to server

  get_chats(){
    let httpOptions = { headers: new HttpHeaders({'Content-Type': 'application/json'})};
    return this.http.get<any>('http://localhost:3000/chats', httpOptions);
  }

  check_user(username){
    let httpOptions = { headers: new HttpHeaders({'Content-Type': 'application/json'})};
    return this.http.post<any>('http://localhost:3000/newchat', {username: username}, httpOptions);
  }



}

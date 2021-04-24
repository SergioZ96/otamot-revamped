import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Chat } from '../interfaces/chat';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

/* ChatService
    - a shared service used to send and retrieve messages and data between users/chats.
    - selectedUser helps components identify which user is the current recipient
*/

export class ChatService {

  // this will be our string subject variable
  public subVar = new Subject<string>();


  // this be how we can update the value of our string subject
  public updateSubject(newsubVar: string) {
    this.subVar.next(newsubVar);
  }

  public receiveSubject(): Observable<string> {
    return this.subVar.asObservable();
  }

  public modalVar = new Subject<string[]>();

  public updateModal(newmodalVar: string[]){
    this.modalVar.next(newmodalVar);
  }

  public receiveModal(): Observable<string[]> {
    return this.modalVar.asObservable();
  }


  _chats_array:Chat[] = [];
  selectedChat: any;
  selectedUser: any;
  username: any;

  constructor(private http: HttpClient, public jwtHelper: JwtHelperService) { }

  //For shared data with chats
  /* pushChat(chat:Chat) {
    this._chats.push(chat);
  } */

  /* getChatlist() {
    return this._chats;
  } */

  // For making requests to server

  get_chats(){
    let httpOptions = { headers: new HttpHeaders({'Content-Type': 'application/json'})};
    return this.http.get<any>('http://localhost:3000/chats', httpOptions);
  }

  check_user(username){
    let httpOptions = { headers: new HttpHeaders({'Content-Type': 'application/json'})};
    return this.http.post<any>('http://localhost:3000/newchat', {username: username}, httpOptions);
  }

  send(message_info){
    // message_info is an object containing the selectedUser info as well as the message
    let httpOptions = { headers: new HttpHeaders({'Content-Type': 'application/json'})};
    return this.http.post<any>('http://localhost:3000/message', message_info, httpOptions);
  }



}

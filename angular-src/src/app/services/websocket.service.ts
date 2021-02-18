import { Injectable } from '@angular/core';
import { io, Socket }  from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private socket: Socket
  uri: string = "http://localhost:3000";


  constructor() {
    // Added some cors options to prevent 404 errors, on client side as well as on server side
    this.socket = io(this.uri, {
      withCredentials: true
    });
  }


  listen(eventName: string){
    return new Observable((subscriber) => {
      this.socket.on(eventName, (data) => {
        subscriber.next(data);
      })
    });
  }

  emit(eventName: string, data: any){
    this.socket.emit(eventName, data);
  }

}

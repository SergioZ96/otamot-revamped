import { Injectable } from '@angular/core';
import { io, Socket }  from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  /* A Socket is the fundamental class for interacting with the server.
      It is basically an EventEmitter which sends events to -- and receive events from -- the server over the network */
  public socket: Socket
  uri: string = "http://localhost:3000";


  constructor() {
    // Added some cors options to prevent 404 errors, on client side as well as on server side

    /* io([url][,options]) function which returns a Socket instance */
    /* this.socket = io(this.uri, {
      withCredentials: true
    }); */
  }
  useSocket(id: string){
    this.socket = io(this.uri, {
      autoConnect: false,
      withCredentials: true,
      query: { id }
    });
  }

  listen(eventName: string){
    return new Observable<any>((subscriber) => {
      this.socket.on(eventName, (data) => {
        subscriber.next(data);
      })
    });
  }

  emit(eventName: string, data: any){
    this.socket.emit(eventName, data);
  }

}

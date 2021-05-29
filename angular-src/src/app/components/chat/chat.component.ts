import { Component, Renderer2, OnInit, Input } from '@angular/core';
import { WebsocketService } from '../../services/websocket.service';
import { ChatService } from '../../services/chat.service';
import dateFormat from 'dateformat';
import { Chat } from 'src/app/interfaces/chat';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  @Input() convos: Chat[];
  message: string;
  chat_id: string;
  chat: Chat;
  chat_recip: string;
  recip_id: string;
  recip_username: string;

  constructor(private webSocketService: WebsocketService, 
              public chatService: ChatService,
              private renderer: Renderer2) { }
              /* The Renderer2 API allows us to manipulate elements of our app without having to touch
                  the DOM directly. This is the recommended approach becuase it then makes it easier 
                  to develop apps that can be rendered in environments that don't have DOM access, like
                  on the server, in a web worker or on desktop/mobile apps 
              */

  ngOnInit(): void {

    /* receives updated data as the current recipient the user is talking to */
    this.chatService.receiveSubject().subscribe( data => {
      this.recip_id = data[0];
      this.recip_username = data[1];
      this.chat_id = data[2];

      if(this.chat_id == "nochat"){
        this.webSocketService.listen('newroom-chatid').subscribe((newroom_chatid) => {
          console.log(newroom_chatid);
          this.chatService.updateSubject(newroom_chatid);
        });
      }

      
    });

    // Receives information from the new chat modal of the recipient the user wishes to talk to
    this.chatService.receiveModal().subscribe((data) => {
      this.recip_id = data[0];
      this.chat_recip = data[1];
    });
   

    this.webSocketService.listen('join-room').subscribe((newchat_id) => {
      console.log("joining a new room");
      this.webSocketService.emit('join-room', newchat_id);
      this.chatService.triggerEvent('REQ_UPDATED_ARRAY');
    });

    this.webSocketService.listen('private-message').subscribe((data) => {
      console.log(data);
    });


    /* this.webSocketService.listen('newroom-chatid').subscribe( (newchat_id) => {
      this.chatService.updateSubject(newchat_id);
    }); */

    

  
  }

  


  sendMessage(message: string) {
    
    // Here, we select our div that holds the messages to be displayed
    let message_container = this.renderer.selectRootElement('#messages', true);

    // Creates a new div element
    //let message_element = this.renderer.createElement('div');
    //this.renderer.addClass(message_element, "author");

    // Creates a new span element
    let span_element = this.renderer.createElement('p');
    this.renderer.addClass(span_element, "author");

    // Creates text
    let text = this.renderer.createText(message);

    this.renderer.appendChild(span_element, text); // adds text to span element
    //this.renderer.appendChild(message_element, span_element); // adds span to div element
    //this.renderer.appendChild(message_container, message_element); // adds div element to message container
    this.renderer.appendChild(message_container, span_element);
    //console.log(this.chat);
    /* if(this.chat){
      let recipients = this.chat.users;
      console.log(recipients);
    } 
    else{

    } */
    let user = JSON.parse(localStorage.getItem('user'));
    let now = new Date();
    let datetime = dateFormat(now, "mm-dd-yy h:MM:ss TT");
    //console.log(user.id);
    //if( this.chat_recip)

    let socket_message = { 
      author_id: user.id ,
      recipient_id: this.recip_id, 
      chat_id: this.chat_id, 
      date_time: datetime, 
      message, 
      newchat: false
    };

    if(this.chat_id == "nochat"){
      socket_message.newchat = true;
      this.webSocketService.emit('private-message', socket_message);
      
    }
    else{
      this.webSocketService.emit('private-message', socket_message);
    }
    //this.webSocketService.emit('message', socket_message);
    

  }

  
}

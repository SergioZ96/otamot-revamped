import { Component, Renderer2, OnInit } from '@angular/core';
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
  message: string;
  selectedUser: String;
  chat_id: string;
  chat: Chat;
  chat_recip: string;

  constructor(private webSocketService: WebsocketService, 
              private chatService: ChatService,
              private renderer: Renderer2) { }
              /* The Renderer2 API allows us to manipulate elements of our app without having to touch
                  the DOM directly. This is the recommended approach becuase it then makes it easier 
                  to develop apps that can be rendered in environments that don't have DOM access, like
                  on the server, in a web worker or on desktop/mobile apps 
              */

  ngOnInit(): void {

    /* 
      Here, we subscribe to an Observable from ChatService which allows us to receive any change
      to the selected chat by providing a chat id from the thumbnail component.
        1. Subscribes to the Observable where data contains the current chat id we are on
        2. We loop through the shared _chats_array until we find the matching chat id
        3. We assign that found chat to our local chat variable and can display any property,
           including messages to the front end
    */
    this.chatService.receiveSubject().subscribe( data => {
      this.chat_id = data;

      this.chatService._chats_array.forEach( chat => {
        if(chat.chat_id == this.chat_id){
          this.chat = chat;
        }
      });
    });
    
    /* this.webSocketService.listen("receive-message").subscribe((data) => {
      console.log(data);
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

    let recipients = this.chat.users;
    this.webSocketService.emit('send-message',{recipients, message });



    /* let user = this.chatService.selectedUser;
    let chat_id = this.chatService.selectedChat;
    let now = new Date();
    let datetime = dateFormat(now, "mm-dd-yy h:MM:ss TT");
    
    const message_info = {
      user,
      
      message: this.message,
      datetime
    };
    this.chatService.send(message_info).subscribe((data) => {
      if(data.success){
        console.log('Message sent');
        console.log(data.result);
      }
      else{
        console.log("Message was not sent");
      }
    }); */
  }

  /* 
    Just some necessary JS code...
  */
   

  

}

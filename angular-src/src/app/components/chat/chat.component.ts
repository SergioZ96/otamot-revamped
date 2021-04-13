import { Component, OnInit } from '@angular/core';
import { WebsocketService } from '../../services/websocket.service';
import { ChatService } from '../../services/chat.service';
import dateFormat from 'dateformat';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  message: String;
  selectedUser: String;

  constructor(private webSocketService: WebsocketService, private chatService: ChatService) { }

  ngOnInit(): void {
  }

  sendMessage() {
    let user = this.chatService.selectedUser;
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
    });
  }
  

}

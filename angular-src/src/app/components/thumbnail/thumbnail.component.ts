import { Component, OnInit, Input } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { WebsocketService } from '../../services/websocket.service';
import { Chat } from '../../interfaces/chat';

@Component({
  selector: 'app-thumbnail',
  templateUrl: './thumbnail.component.html',
  styleUrls: ['./thumbnail.component.css']
})
export class ThumbnailComponent implements OnInit {
  @Input() thumb_chat: Chat;
  @Input() new_recip: string[];
  chat_id: string;
  recipient_name: string;
  

  constructor(private chatservice: ChatService, private webSocketService: WebsocketService) { }

  ngOnInit(): void {
    /* let self = localStorage.getItem('user');
    this.thumb_chat */

  }

  chatSelection(chat_id){
    this.chatservice.updateSubject(chat_id);
    this.chat_id = chat_id;
  }

  joinRoom(){
    //users is an array of author(current user) and recipient ids - [ author_id, recipient_id]
    //this.webSocketService.useSocket(this.thumb_chat.users[1]);
    this.webSocketService.useSocket(this.thumb_chat.chat_id);
    
    /* this.webSocketService.listen("private").subscribe((data) => {
      console.log(data);
    }); */
    //this.webSocketService.emit("private", this.chat_id)
  }

}

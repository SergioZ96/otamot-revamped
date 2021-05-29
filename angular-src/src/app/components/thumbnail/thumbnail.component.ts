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
  recip_username: string;
  

  constructor(private chatservice: ChatService, private webSocketService: WebsocketService) { }

  ngOnInit(): void {
    if(this.thumb_chat){
      this.extract_recip_username(this.thumb_chat.recip[0]);
    }
    
    
  }
  /* Finds the recipients username from the Chat input */
  extract_recip_username(recip_id){
    let user = this.thumb_chat.users.find( e => e._id._id == recip_id);
    this.recip_username = user._id.username;
  }

  /* chatSelection(chat_id){
    this.chatservice.updateSubject(chat_id);
    this.chat_id = chat_id;
  } */


}

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
  chat_id: string;

  constructor(private chatservice: ChatService, private webSocketService: WebsocketService) { }

  ngOnInit(): void {
  }

  chatSelection(chat_id){
    this.chatservice.updateSubject(chat_id);
    this.chat_id = chat_id;
  }

  joinRoom(){
    /* this.webSocketService.listen("private").subscribe((data) => {
      console.log(data);
    }); */
    //this.webSocketService.emit("private", this.chat_id)
  }

}

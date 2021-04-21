import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { WebsocketService} from '../../services/websocket.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  providers: [ChatService]
})
export class MainComponent implements OnInit {
  message: String;
  chatList: any;

  constructor(private chatService: ChatService, private webSocketService: WebsocketService) { }

  ngOnInit(): void {
    this.chatService.get_chats().subscribe((data) => {
      if(data.success){
        console.log(data.chats);
      }
    });

    /* this.webSocketService.listen("test event").subscribe((data) => {
      console.log(data);
    }); */
  }

  

}

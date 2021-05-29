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
  chat_list: any;
  unset_chat: any;


  constructor(private chatService: ChatService, private webSocketService: WebsocketService) { }

  ngOnInit(): void {

    /* Load chats -> then relay information to both sidenav and chat component (children) */

    

    this.connectUserRoom();
    
  }


  /* Emit setSocket event to allow user to connect to their own respective room.
        Necessary for other users to start a new chat with their desired recipient */
        
  connectUserRoom(){
    let user_id = JSON.parse(localStorage.getItem('user')).id; 
    this.webSocketService.emit('setSocket', { user_id : user_id });
  }

  formatChats() {
    this.chatService.get_chats().subscribe((data) => {
      /* Chat array format that is returned to use from the backend
       *
       *  data : {
       *          chats: [
       *                      {
       *                        messages : [
       *                                      { 
       *                                        recip: [],
       *                                        _id: string,
       *                                        author: string,
       *                                        date_time: string,
       *                                        message_body: string
       *                                      }
       *                                  ],
       * 
       *                        users : [
       *                                      {
       *                                        _id: { 
       *                                                chats: [],
       *                                                email: string,
       *                                                password: string,
       *                                                username: string,
       *                                                _id: string
       *                                             },
       * 
       *                                        
       *                                      },
       *  
       *                                      { 
       *                                        _id: {},...
       *                                      }, ...
       * 
       *                                 ],
       * 
       *                        _id: string (chat id)
       *                        
       *                      }, 
       *                      {}, {}
       * 
       *                 ],
       *                 [], [], 
       * 
       *          ...}
       * 
       *  */
      console.log(data);
      if(data.chats.length > 0){
        let user_self_id = JSON.parse(localStorage.getItem("user")).id;
        
        for( let i = 0; i < data.chats.length; i++){

          let recipient = data.chats[i].users.find(e => e._id._id != user_self_id);
          console.log(recipient);
          this.unset_chat = {
            messages: data.chats[i].messages,
            users: data.chats[i].users,
            chat_id: data.chats[i]._id,
            recip: [recipient._id._id]
          };
          
          this.chat_list.push(this.unset_chat);
                     
        }


      }

    });
  }

  

}

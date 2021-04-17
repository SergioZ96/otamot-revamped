import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { Chat } from '../../interfaces/chat';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  chat_list: Chat[] = [];
  unset_chat: Chat;

  constructor(public chatservice: ChatService) { }

  ngOnInit(): void {
    this.chatservice.get_chats().subscribe((data) => {
      if(data.chats.length > 0){
        for( let i = 0; i < data.chats.length; i++){
          this.unset_chat = {
            messages: data.chats[i].messages,
            users: data.chats[i].users,
            chat_id: data.chats[i]._id,
            recip: data.chats[i].messages[0].recip
          };
          //this.chatservice._chats_array.push(this.chat);
          this.chat_list.push(this.unset_chat);
      
          /* let thumbnail = document.createElement('custom-thumb');
          document.getElementById('chats').appendChild(thumbnail);
          
          document.getElementById('recip_name').innerHTML = this.unset_chat.recip[0];
          document.getElementById('chat-id').innerHTML = this.unset_chat.chat_id; */
        }
      }

    });
  }

  /* Open model for new chat */
  openModal() {
    document.getElementById('modal_1').style.display = 'block';
  }

  /* Creating a new chat between users */
  

  /* Search chat/conversation that already exists */

}

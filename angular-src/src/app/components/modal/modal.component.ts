import { Component, Renderer2, OnInit, Input } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { Chat } from '../../interfaces/chat';
 
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  /* 
   *  This is our modal component. We injected the ElementRef class so we can have access
   *  to the component's DOM in the browser. With reference to its DOM we can manipulate 
   *  its visibility
   * */

  //private _chat: Chat = 
  @Input() convos: Chat[];
  recip_username: string;
  new_convo: Chat;
  chat_list: Chat[];

  constructor(public chatservice: ChatService, private renderer: Renderer2) { }

  ngOnInit(): void {

    /* Trying to obtain the current list of chats and setting it to chat_list */
    this.chatservice.receiveConvos().subscribe((convo_array) => {
      this.chat_list = convo_array;
    });

    /* Attempts to retrieve the current list of chats, push the new conversation, and update the Observable with a new Chat[] */
    /* if(this.new_convo){
      this.chatservice.receiveConvos().subscribe((convo_array) => {
        convo_array.push(this.new_convo);
        console.log(convo_array);
        this.chatservice.updateConvos(convo_array);
      });
    } */
      
    
    
  }

  /* Our function for starting a new chat */
  checkUser(){
    // Here, we must close the modal if the username was found and set the chat screen.
    // Else, notify the user the username was not found

    this.chatservice.check_user(this.recip_username).subscribe(data => {
      /* 
        data = {
            status: true,
            recipient_info: {
              chats: [],
              email: string,
              password: string,
              username: string,
              _id: string
            }
        } 
      */
      if(data.status){
        //console.log(data);
        let found_user;
        for(let i = 0; i < this.chatservice._chats_array.length; i++){
          let some_chat_users = this.chatservice._chats_array[i].users;
          found_user = some_chat_users.find( e => e._id.username == this.recip_username);
          if(found_user){
            break;
          }
        }
        if(found_user){
          
          //this.chatservice.updateModal([undefined, undefined]);
          this.chatservice.updateSubject([found_user._id._id, found_user._id.username, found_user._id.chats[0]]);
          console.log(found_user);
        }
        else{ // will be a new conversation
          console.log("This will be a new convo");
          this.new_convo  = {
            messages: [],
            users: [data.recipient_info.username],
            chat_id: undefined,
            recip: [data.recipient_info._id]
          };
          console.log(this.new_convo);
          this.chat_list.push(this.new_convo);
          this.chatservice.updateConvos(this.chat_list);
          
          
          //this.chatservice.updateModal([data.recipient_info._id, this.recip_username]);
          this.chatservice.updateSubject([data.recipient_info._id, this.recip_username, undefined]);
        }
       
        

        // Hides the modal after starting new chat
        let modal = this.renderer.selectRootElement('#modal_1', true);
        this.renderer.setStyle(modal, 'display', 'none');
      
      }
      else{
        document.getElementById('modal-message').innerHTML = "User was not found";
      }
    });
    
  }



  /* Our function used to close the new chat modal */
  closeModal(){
    document.getElementById('modal_1').style.display = 'none';
  }

}

import { Component, ElementRef, OnInit } from '@angular/core';
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

  recip_username: string;

  constructor(private chatservice: ChatService) { }

  ngOnInit(): void {
    
  }

  /* Our function for starting a new chat */
  checkUser(){
    // Here, we must close the modal if the username was found and set the chat screen.
    // Else, notify the user the username was not found

    this.chatservice.check_user(this.recip_username).subscribe(data => {
      if(data.status){
        document.getElementById('modal_1').style.display = 'none';
        let thumbnail = document.createElement("custom-thumb");
        
        /* let doc = thumbnail.getElementsByTagName("h3");
        console.log(doc); */
        //document.getElementsByTagName("h3")[0].innerHTML = `${this.recip_username}`;
        //let thumbname = thumbnail.getElementsByTagName("h3")[0].innerHTML = `${this.recip_username}`;
        document.getElementById('chats').appendChild(thumbnail);
        document.getElementById('recip_name').innerHTML = `${this.recip_username}`;
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

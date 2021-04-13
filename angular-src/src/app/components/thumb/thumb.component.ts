import { Component, OnInit } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'custom-thumb',
  templateUrl: './thumb.component.html',
  styleUrls: ['./thumb.component.css']
})
export class ThumbComponent implements OnInit {
  chat_id: String;
  recipient: String;

  constructor(private chatservice: ChatService) { }

  ngOnInit(): void {
  }

  selectChat(){
    this.chatservice.selectedChat = ""
  }

}

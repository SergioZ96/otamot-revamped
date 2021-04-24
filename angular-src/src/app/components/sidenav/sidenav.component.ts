import { Component, OnInit, ComponentFactoryResolver, ViewChild } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { Chat } from '../../interfaces/chat';
import { ThumbDirective } from 'src/app/directives/thumb.directive';
import { ThumbnailComponent } from '../thumbnail/thumbnail.component';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  chat_list: Chat[] = [];
  unset_chat: Chat;
  // Here we use ViewChild which is a property decorator that configures a view query. Here our view query is a
  // a reference to where our ThumbDirective 'appThumb' is in our SidenavComponent
  @ViewChild(ThumbDirective, {static: true}) appThumb: ThumbDirective;

  constructor(public chatservice: ChatService, private componentFactoryResolver: ComponentFactoryResolver) { }

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
          this.chatservice._chats_array.push(this.unset_chat);
          this.chat_list.push(this.unset_chat);
      
          /* let thumbnail = document.createElement('custom-thumb');
          document.getElementById('chats').appendChild(thumbnail);
          
          document.getElementById('recip_name').innerHTML = this.unset_chat.recip[0];
          document.getElementById('chat-id').innerHTML = this.unset_chat.chat_id; */
        }
      }

    });

    // receiveModal returns an observable, which we subscribe to and retrieve new recipient id and username when available from Modal component 
    this.chatservice.receiveModal().subscribe((data) => {
      //data[0] = recipient id
      //data[1] = recipient username

      // The ComponentFactory retrieves the factory object of the component type used to create an instance of each component 
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(ThumbnailComponent);

      // Creating our ViewContainer for where we placed our directive
      const viewContainerRef = this.appThumb.viewContainerRef;
      console.log(viewContainerRef);
      viewContainerRef.clear();

      // Creates an instance of our ThumbnailComponent and inserts its host view into the ViewContainer
      const componentRef = viewContainerRef.createComponent<ThumbnailComponent>(componentFactory);
      // We pass the data from our Observable to the new instance
      componentRef.instance.new_recip = data;
    });

  }

  /* Open model for new chat */
  openModal() {
    document.getElementById('modal_1').style.display = 'block';
  }

  /* Creating a new chat between users */
  

  /* Search chat/conversation that already exists */

}

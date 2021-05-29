import { Component, OnInit, ComponentFactoryResolver, ViewChild, Input } from '@angular/core';
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
  @Input() convos: Chat[];
  
  // Here we use ViewChild which is a property decorator that configures a view query. Here our view query is a
  // a reference to where our ThumbDirective 'appThumb' is in our SidenavComponent
  @ViewChild(ThumbDirective, {static: true}) appThumb: ThumbDirective;
  
  constructor(public chatservice: ChatService, private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit(): void {
    
    

    /* this.chatservice.receiveConvos().subscribe((convo_array) => {
      let user_self_id = JSON.parse(localStorage.getItem("user")).id;

      let new_convo = convo_array.find(e => e.chat_id == undefined);
      console.log(new_convo);
      if (new_convo){
        this.createThumbnail([new_convo.recip[0], new_convo.users[0], new_convo.chat_id]);
      }
      //let new_recip = new_convo.users.find(e => e._id._id != user_self_id);

      // ([ recipient id, the recipient username, undefined chat id ])
      
    }); */

    //this.formatChats();

    /* this.chatservice.receiveEvent().subscribe((someEvent) => {
      if(someEvent == 'REQ_UPDATED_ARRAY'){
        //this.formatChats();
      }
    }); */
    

    // receiveModal returns an observable, which we subscribe to and retrieve new recipient id and username when available from Modal component 
    /* this.chatservice.receiveModal().subscribe((data) => {
      if(data[0] == undefined){
        this.chatservice.receiveSubject().subscribe((data) => {
          this.createThumbnail(data);
        });
      }
      else{
        this.createThumbnail(data);
      }
      
      //data[0] = recipient id
      //data[1] = recipient username
      
      
      
    }); */

  }

  /* Open model for new chat */
  openModal() {
    document.getElementById('modal_1').style.display = 'block';
  }

  createThumbnail(thumbnail_data: string[]) {
    // The ComponentFactory retrieves the factory object of the component type used to create an instance of each component 
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(ThumbnailComponent);

    // Creating our ViewContainer for where we placed our directive
    const viewContainerRef = this.appThumb.viewContainerRef;
    //console.log(viewContainerRef);
    //viewContainerRef.clear();

    // Creates an instance of our ThumbnailComponent and inserts its host view into the ViewContainer
    const componentRef = viewContainerRef.createComponent<ThumbnailComponent>(componentFactory);
    // We pass the data from our Observable to the new instance
    
    componentRef.instance.new_recip = thumbnail_data;
  }

  

}

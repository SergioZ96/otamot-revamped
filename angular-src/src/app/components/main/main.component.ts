import { Component, OnInit } from '@angular/core';
import { WebsocketService} from '../../services/websocket.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private webSocketService: WebsocketService) { }

  ngOnInit(): void {
    this.webSocketService.listen("test event").subscribe((data) => {
      console.log(data);
    });
  }

}

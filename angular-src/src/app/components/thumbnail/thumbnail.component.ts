import { Component, OnInit, Input } from '@angular/core';
import { Chat } from '../../interfaces/chat';

@Component({
  selector: 'app-thumbnail',
  templateUrl: './thumbnail.component.html',
  styleUrls: ['./thumbnail.component.css']
})
export class ThumbnailComponent implements OnInit {
  @Input() thumb_chat: Chat;

  constructor() { }

  ngOnInit(): void {
  }

}

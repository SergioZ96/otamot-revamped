import { Component, OnInit } from '@angular/core';
import { createCustomElement } from '@angular/elements';

@Component({
  selector: 'custom-thumb',
  templateUrl: './thumb.component.html',
  styleUrls: ['./thumb.component.css']
})
export class ThumbComponent implements OnInit {
  chat_id: String;
  recipient: String;

  constructor() { }

  ngOnInit(): void {
  }

}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  /* Open model for new chat */
  openModal() {
    document.getElementById('modal_1').style.display = 'block';
  }

  /* Creating a new chat between users */
  

  /* Search chat/conversation that already exists */

}

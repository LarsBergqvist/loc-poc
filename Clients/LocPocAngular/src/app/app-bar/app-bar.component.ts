import { Component, OnInit } from '@angular/core';
import { MessageService } from '../services/message.service';
import { AddNewLocationMessage } from '../messages/add-new-location.message';

@Component({
  selector: 'app-bar',
  templateUrl: './app-bar.component.html',
  styleUrls: ['./app-bar.component.scss']
})
export class AppBarComponent implements OnInit {

  constructor(private readonly messageService: MessageService ) { }

  ngOnInit() {
  }

  addNewLocation() {
    this.messageService.sendMessage(new AddNewLocationMessage());
  }


}

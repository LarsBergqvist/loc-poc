import { Component, OnInit } from '@angular/core';
import { MessageService } from '../services/message.service';
import { AddNewPlaceMessage } from '../messages/add-new-place.message';

@Component({
  selector: 'app-bar',
  templateUrl: './app-bar.component.html',
  styleUrls: ['./app-bar.component.scss']
})
export class AppBarComponent implements OnInit {

  constructor(private readonly messageService: MessageService ) { }

  ngOnInit() {
  }

  addNewPlace() {
    this.messageService.sendMessage(new AddNewPlaceMessage());
  }


}

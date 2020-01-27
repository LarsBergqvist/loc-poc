import { Component, OnInit } from '@angular/core';
import { MessageService } from './services/message.service';
import { AddNewPlaceMessage } from './messages/add-new-place.message';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private readonly messageService: MessageService) {
  }

  ngOnInit(): void {
    const messages = this.messageService.getMessage();
    messages.pipe(filter(message => message instanceof AddNewPlaceMessage))
    .subscribe(message  => {
      console.log('got AddNew');
    });
  }
}

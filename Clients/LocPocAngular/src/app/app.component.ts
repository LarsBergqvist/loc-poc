import { Component, OnInit } from '@angular/core';
import { MessageService } from './services/message.service';
import { filter } from 'rxjs/operators';
import { SaveLocationMessage } from './messages/save-location.message';
import { LocationsService } from './services/locations.service';
import { RefreshListMessage } from './messages/refresh-list.message';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private readonly messageService: MessageService, private readonly locationsService: LocationsService) {
  }

  ngOnInit(): void {
    const messages = this.messageService.getMessage();

    messages.pipe(filter(message => message instanceof SaveLocationMessage))
    .subscribe( (message: SaveLocationMessage)  => {
      if (message.addNew) {
        console.log('got save new');
        this.locationsService.saveNewLocation(message.location).then(value => {
          this.messageService.sendMessage(new RefreshListMessage());
        });
      }
    });

  }
}

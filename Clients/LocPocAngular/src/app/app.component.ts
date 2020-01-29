import { Component, OnInit, Inject } from '@angular/core';
import { MessageService } from './services/message.service';
import { filter } from 'rxjs/operators';
import { SaveLocationMessage } from './messages/save-location.message';
import { LocationsService } from './services/locations.service';
import { RefreshListMessage } from './messages/refresh-list.message';
import { DeleteLocationMessage } from './messages/delete-location.message';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private readonly messageService: MessageService,
              @Inject('LocationsService') private readonly locationsService: LocationsService) {
  }

  ngOnInit(): void {
    const messages = this.messageService.getMessage();

    messages.pipe(filter(message => message instanceof SaveLocationMessage))
      .subscribe( (message: SaveLocationMessage)  => {
        if (message.addNew) {
          this.locationsService.saveNewLocation(message.location).then(value => {
            this.messageService.sendMessage(new RefreshListMessage());
          });
        } else {
          this.locationsService.updateLocation(message.location).then(value => {
            this.messageService.sendMessage(new RefreshListMessage());
          });
        }
    });

    messages.pipe(filter(message => message instanceof DeleteLocationMessage))
      .subscribe( (message: DeleteLocationMessage)  => {
          this.locationsService.deleteLocation(message.id).then(value => {
            this.messageService.sendMessage(new RefreshListMessage());
          });
    });

  }
}

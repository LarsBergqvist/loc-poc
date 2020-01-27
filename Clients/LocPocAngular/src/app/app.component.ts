import { Component, OnInit } from '@angular/core';
import { MessageService } from './services/message.service';
import { filter } from 'rxjs/operators';
import { SavePlaceMessage } from './messages/save-place.message';
import { PlacesService } from './services/places.service';
import { RefreshListMessage } from './messages/refresh-list.message';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private readonly messageService: MessageService, private readonly placesService: PlacesService) {
  }

  ngOnInit(): void {
    const messages = this.messageService.getMessage();

    messages.pipe(filter(message => message instanceof SavePlaceMessage))
    .subscribe( (message: SavePlaceMessage)  => {
      if (message.addNew) {
        console.log('got save new');
        this.placesService.saveNewPlace(message.place).then(value => {
          this.messageService.sendMessage(new RefreshListMessage());
        });
      }
    });

  }
}

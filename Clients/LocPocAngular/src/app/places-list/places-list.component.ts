import { Component, OnInit } from '@angular/core';
import { PlacesService } from '../services/places.service';
import { Place } from '../models/place';
import { MessageService } from '../services/message.service';
import { RefreshListMessage } from '../messages/refresh-list.message';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-places-list',
  templateUrl: './places-list.component.html',
  styleUrls: ['./places-list.component.scss']
})
export class PlacesListComponent implements OnInit {
  options: any;
  overlays: any;
  places: Place[];
  constructor(private readonly placesService: PlacesService, private readonly messageService: MessageService) { }

  async ngOnInit() {
    const messages = this.messageService.getMessage();
    messages.pipe(filter(message => message instanceof RefreshListMessage))
    .subscribe( async message  => {
      await this.refreshList();
    });

    await this.refreshList();
  }

  private async refreshList() {
    this.places = await this.placesService.getPlaces();
  }

}

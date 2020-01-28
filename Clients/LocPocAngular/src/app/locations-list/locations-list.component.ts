import { Component, OnInit } from '@angular/core';
import { LocationsService } from '../services/locations.service';
import { Location } from '../models/location';
import { MessageService } from '../services/message.service';
import { RefreshListMessage } from '../messages/refresh-list.message';
import { filter } from 'rxjs/operators';
import { OpenLocationDetailsMessage } from '../messages/open-location-details.message';

@Component({
  selector: 'app-locations-list',
  templateUrl: './locations-list.component.html'
})
export class LocationsListComponent implements OnInit {
  options: any;
  overlays: any;
  locations: Location[];
  constructor(private readonly locationsService: LocationsService, private readonly messageService: MessageService) { }

  async ngOnInit() {
    const messages = this.messageService.getMessage();
    messages.pipe(filter(message => message instanceof RefreshListMessage))
    .subscribe( async message  => {
      await this.refreshList();
    });

    await this.refreshList();
  }

  onRowSelect(location) {
    this.messageService.sendMessage(new OpenLocationDetailsMessage(location));
  }

  private async refreshList() {
    this.locations = await this.locationsService.getLocations();
  }

}

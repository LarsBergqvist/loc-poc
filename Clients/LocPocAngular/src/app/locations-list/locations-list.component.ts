import { Component, OnInit, Inject } from '@angular/core';
import { LocationsService } from '../services/locations.service';
import { Location } from '../models/location';
import { MessageBrokerService } from '../services/message-broker.service';
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
    constructor(private readonly messageService: MessageBrokerService,
                @Inject('LocationsService') private readonly locationsService: LocationsService) { }

    async ngOnInit() {
        const messages = this.messageService.getMessage();
        messages.pipe(filter(message => message instanceof RefreshListMessage))
            .subscribe(async message => {
                await this.refreshList();
            });

        await this.refreshList();
    }

    onRowSelect(location) {
        this.messageService.sendMessage(new OpenLocationDetailsMessage(location));
    }

    private async refreshList() {
        this.locations = await (await this.locationsService.getLocations()).sort((a, b) => a.Name.localeCompare(b.Name));
    }

}

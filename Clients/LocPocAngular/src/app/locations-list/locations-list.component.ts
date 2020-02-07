import { Component, OnInit, Inject } from '@angular/core';
import { LocationsService } from '../services/locations.service';
import { Location } from '../models/location';
import { MessageBrokerService } from '../services/message-broker.service';
import { RefreshListMessage } from '../messages/refresh-list.message';
import { filter, takeUntil } from 'rxjs/operators';
import { OpenLocationDetailsMessage } from '../messages/open-location-details.message';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-locations-list',
    templateUrl: './locations-list.component.html'
})
export class LocationsListComponent implements OnInit {
    private unsubsribe$ = new Subject();
    options: any;
    overlays: any;
    locations: Location[];
    loading = false;

    constructor(private readonly messageService: MessageBrokerService,
                @Inject('LocationsService') private readonly locationsService: LocationsService) { }

    async ngOnInit() {
        const messages = this.messageService.getMessage();
        messages.pipe(takeUntil(this.unsubsribe$), filter(message => message instanceof RefreshListMessage))
            .subscribe(async message => {
                await this.refreshList();
            });

        await this.refreshList();
    }

    onRowSelect(location) {
        this.messageService.sendMessage(new OpenLocationDetailsMessage(location));
    }

    private async refreshList() {
        this.loading = true;
        this.locations = await this.locationsService.getLocations();
        if (this.locations) {
            this.locations.sort((a, b) => a.name.localeCompare(b.name));
        }
        this.loading = false;
    }

}

import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MessageBrokerService } from '../services/message-broker.service';
import { filter, takeUntil } from 'rxjs/operators';
import { OpenLocationDetailsMessage } from '../messages/open-location-details.message';
import { Location } from '../models/location';
import { AddNewLocationMessage } from '../messages/add-new-location.message';
import * as clone from 'clone';
import { AppConfigService } from '../services/app-config.service';
import { LocationsService } from '../services/locations.service';
import { RefreshListMessage } from '../messages/refresh-list.message';
import { NgModel } from '@angular/forms';
import { NewMarkerFromMapMessage } from '../messages/new-marker-from-map.message';
import { LoggingService } from '../services/logging-service';
import { ErrorOccurredMessage } from '../messages/error-occurred.message';
import { SuccessInfoMessage } from '../messages/success-info.message';
import { Subject } from 'rxjs';

enum LocationEditMode {
    AddNew = 0,
    Edit = 1
}

@Component({
    selector: 'app-location-details',
    templateUrl: './location-details.component.html',
    styleUrls: ['./location-details.component.scss']
})
export class LocationDetailsComponent implements OnInit {
    private unsubsribe$ = new Subject();
    isVisible = false;
    location: Location;
    editMode: LocationEditMode;
    longitudeRange = {
        min: -180.0,
        max: 180.0
    };
    latitudeRange = {
        min: -90.0,
        max: 90.0
    };

    @ViewChild('longitude') longitudeModel: NgModel;
    @ViewChild('latitude') latitudeModel: NgModel;

    constructor(private readonly messageBroker: MessageBrokerService,
                private readonly appConfigService: AppConfigService,
                @Inject('LocationsService') private readonly locationsService: LocationsService,
                private readonly logging: LoggingService) {
                this.createDefaultLocation();
    }

    async ngOnInit() {
        const messages = this.messageBroker.getMessage();
        messages.pipe(takeUntil(this.unsubsribe$), filter(message => message instanceof OpenLocationDetailsMessage))
            .subscribe(async (message: OpenLocationDetailsMessage) => {
                if (message) {
                    this.location = clone(message.location);
                    this.editMode = LocationEditMode.Edit;
                    this.isVisible = true;
                }
            });
        messages.pipe(takeUntil(this.unsubsribe$), filter(message => message instanceof AddNewLocationMessage))
            .subscribe((message: AddNewLocationMessage) => {
                if (message) {
                    this.createDefaultLocation();
                    this.editMode = LocationEditMode.AddNew;
                    this.isVisible = true;
                    this.setCurrentPosition();
                }
            });
        messages.pipe(takeUntil(this.unsubsribe$), filter(message => message instanceof NewMarkerFromMapMessage))
            .subscribe(async (message: NewMarkerFromMapMessage) => {
                // Update the location with the position from the new marker
                this.location = {
                    id: this.location.id,
                    name: this.location.name,
                    description: this.location.description,
                    latitude: message.latitude,
                    longitude: message.longitude
                };
            });
    }

    onInputChanged($event) {
        this.location = clone(this.location);
    }

    get canSaveLocation(): boolean {
        if (!this.location || !this.location.name) {
            return false;
        }

        if (this.location.name.replace(/^[ \t\r\n]+/i, '').length <= 0) {
            return false;
        }

        if (this.longitudeModel && this.longitudeModel.errors) {
            return false;
        }

        if (this.latitudeModel && this.latitudeModel.errors) {
            return false;
        }

        return true;
    }

    get isAddNewMode(): boolean {
        return this.editMode === LocationEditMode.AddNew;
    }

    get useMap(): boolean {
        return this.appConfigService.useMap;
    }

    saveNewLocation() {
        this.locationsService.saveNewLocation(this.location).then(() => {
            this.isVisible = false;
            this.messageBroker.sendMessage(new SuccessInfoMessage('A new location item was created.'));
            this.messageBroker.sendMessage(new RefreshListMessage());
        }).catch((error) => {
            this.logging.logError(error);
        });
    }

    updateLocation() {
        this.locationsService.updateLocation(this.location).then(() => {
            this.isVisible = false;
            this.messageBroker.sendMessage(new SuccessInfoMessage('The location item was updated.'));
            this.messageBroker.sendMessage(new RefreshListMessage());
        }).catch((error) => {
            this.logging.logError(error);
        });
    }

    deleteLocation() {
        this.locationsService.deleteLocation(this.location.id).then(() => {
            this.isVisible = false;
            this.messageBroker.sendMessage(new SuccessInfoMessage('A location item was deleted.'));
            this.messageBroker.sendMessage(new RefreshListMessage());
        }).catch((error) => {
            this.logging.logError(error);
        });
    }

    close() {
        this.isVisible = false;
    }

    private createDefaultLocation() {
        this.location = {
            id: '',
            name: '',
            description: '',
            latitude: 0.0,
            longitude: 51.482578
        };
    }

    private setCurrentPosition() {
        navigator.geolocation.getCurrentPosition(position => {
            this.location = {
                id: this.location.id,
                name: this.location.name,
                description: this.location.description,
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            };
        }, error => {
            this.logging.logError(error.message);
            this.messageBroker.sendMessage(new ErrorOccurredMessage(error.message));
        });
    }

}

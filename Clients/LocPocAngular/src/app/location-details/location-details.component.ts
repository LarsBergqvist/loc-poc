import { Component, OnInit, Inject } from '@angular/core';
import { MessageBrokerService } from '../services/message-broker.service';
import { filter } from 'rxjs/operators';
import { OpenLocationDetailsMessage } from '../messages/open-location-details.message';
import { Location } from '../models/location';
import { AddNewLocationMessage } from '../messages/add-new-location.message';
import * as clone from 'clone';
import { AppConfigService } from '../services/app-config.service';
import { LocationsService } from '../services/locations.service';
import { RefreshListMessage } from '../messages/refresh-list.message';
import { NewMarkerFromMapMessage } from '../messages/new-marker-from-map.message';

enum LocationEditMode {
  AddNew = 0,
  Edit =  1
}

export interface LatLongRange {
  min: number;
  max: number;
}

@Component({
  selector: 'app-location-details',
  templateUrl: './location-details.component.html'
})
export class LocationDetailsComponent implements OnInit {
  isVisible = false;
  location: Location;
  editMode: LocationEditMode;
  longitudeRange: LatLongRange = {
    min: -180.0,
    max: 180.0
  };
  latitudeRange: LatLongRange = {
    min: -90.0,
    max: 90.0
  };

  constructor(private readonly messageBroker: MessageBrokerService,
              private readonly appConfigService: AppConfigService,
              @Inject('LocationsService') private readonly locationsService: LocationsService) {
    this.createDefaultLocation();
  }

  async ngOnInit() {
    const messages = this.messageBroker.getMessage();
    messages.pipe(filter(message => message instanceof OpenLocationDetailsMessage))
    .subscribe(async (message: OpenLocationDetailsMessage)  => {
      if (message) {
        this.location = clone(message.location);
        this.editMode = LocationEditMode.Edit;
        this.isVisible = true;
      }
    });
    messages.pipe(filter(message => message instanceof AddNewLocationMessage))
    .subscribe(async (message: AddNewLocationMessage)  => {
      if (message) {
        this.createDefaultLocation();
        await this.setCurrentPosition();
        this.editMode = LocationEditMode.AddNew;
        this.isVisible = true;
      }
    });
    messages.pipe(filter(message => message instanceof NewMarkerFromMapMessage))
    .subscribe(async (message: NewMarkerFromMapMessage)  => {
      // Update the location with the position from the new marker
        this.location = {
          Id: this.location.Id,
          Name: this.location.Name,
          Description: this.location.Description,
          Latitude: message.latitude,
          Longitude: message.longitude
        };
    });
  }

  onInputChanged($event) {
    this.location =  clone(this.location);
  }

  get canSaveLocation(): boolean {
    if (!this.location || !this.location.Name) {
      return false;
    }

    if (this.location.Name.replace(/^[ \t\r\n]+/i, '').length <= 0) {
      return false;
    }

    if (!this.location.Longitude ||
        (this.location.Longitude < this.longitudeRange.min || this.location.Longitude > this.longitudeRange.max)) {
        return false;
    }

    if (!this.location.Latitude ||
      (this.location.Latitude < this.latitudeRange.min || this.location.Latitude > this.latitudeRange.max)) {
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

  saveLocation() {
    this.locationsService.saveNewLocation(this.location).then(() => {
      this.isVisible = false;
      this.messageBroker.sendMessage(new RefreshListMessage());
    }).catch((error) => {
      console.log(error);
    });
  }

  updateLocation() {
    this.locationsService.updateLocation(this.location).then(() => {
      this.isVisible = false;
      this.messageBroker.sendMessage(new RefreshListMessage());
    }).catch((error) => {
      console.log(error);
    });
  }

  deleteLocation() {
    this.locationsService.deleteLocation(this.location.Id).then(() => {
      this.isVisible = false;
      this.messageBroker.sendMessage(new RefreshListMessage());
    }).catch((error) => {
      console.log(error);
    });
  }

  private createDefaultLocation() {
    this.location = {
      Id: '',
      Name: '',
      Description: '',
      Latitude: 0.0,
      Longitude: 51.482578
    };
  }

  private async setCurrentPosition() {
    navigator.geolocation.getCurrentPosition(async position => {
      this.location = {
        Id: this.location.Id,
        Name: this.location.Name,
        Description: this.location.Description,
        Latitude: position.coords.latitude,
        Longitude: position.coords.longitude
      };
    });
  }

}

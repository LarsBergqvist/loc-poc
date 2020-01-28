import { Component, OnInit } from '@angular/core';
import { MessageService } from '../services/message.service';
import { filter } from 'rxjs/operators';
import { OpenLocationDetailsMessage } from '../messages/open-location-details.message';
import { Location } from '../models/location';
import { SaveLocationMessage } from '../messages/save-location.message';
import { AddNewLocationMessage } from '../messages/add-new-location.message';
import * as clone from 'clone';

enum LocationEditMode {
  AddNew = 0,
  Edit =  1
}

@Component({
  selector: 'app-location-details',
  templateUrl: './location-details.component.html'
})
export class LocationDetailsComponent implements OnInit {
  isVisible = false;
  location: Location;
  editMode: LocationEditMode;

  constructor(private readonly messageService: MessageService) {
    this.createDefaultLocation();
  }

  async ngOnInit() {
    const messages = this.messageService.getMessage();
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
  }

  get canSaveLocation(): boolean {
    if (!this.location || !this.location.Name) {
      return false;
    }

    return this.location.Name.replace(/^[ \t\r\n]+/i, '').length > 0;
  }

  get isAddNewMode(): boolean {
    return this.editMode === LocationEditMode.AddNew;
  }

  saveLocation() {
    this.messageService.sendMessage(new SaveLocationMessage(this.location, true));
    this.isVisible = false;
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
      this.location.Latitude = position.coords.latitude;
      this.location.Longitude = position.coords.longitude;
    });
  }

}

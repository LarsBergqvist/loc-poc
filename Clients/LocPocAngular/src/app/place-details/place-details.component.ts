import { Component, OnInit } from '@angular/core';
import { MessageService } from '../services/message.service';
import { filter } from 'rxjs/operators';
import { OpenPlaceDetailsMessage } from '../messages/open-place-details.message';
import { Place } from '../models/place';
import { SavePlaceMessage } from '../messages/save-place.message';
import { AddNewPlaceMessage } from '../messages/add-new-place.message';
import * as clone from 'clone';

enum PlaceEditMode {
  AddNew = 0,
  Edit =  1
}

@Component({
  selector: 'app-place-details',
  templateUrl: './place-details.component.html',
  styleUrls: ['./place-details.component.scss']
})
export class PlaceDetailsComponent implements OnInit {
  isVisible = false;
  place: Place;
  editMode: PlaceEditMode;

  constructor(private readonly messageService: MessageService) {
    this.createEmptyPlace();
  }

  async ngOnInit() {
    const messages = this.messageService.getMessage();
    messages.pipe(filter(message => message instanceof OpenPlaceDetailsMessage))
    .subscribe(async (message: OpenPlaceDetailsMessage)  => {
      if (message) {
        this.place = clone(message.place);
        this.editMode = PlaceEditMode.Edit;
        this.isVisible = true;
      }
    });
    messages.pipe(filter(message => message instanceof AddNewPlaceMessage))
    .subscribe(async (message: AddNewPlaceMessage)  => {
      if (message) {
        this.createEmptyPlace();
        await this.setCurrentPosition();
        this.editMode = PlaceEditMode.AddNew;
        this.isVisible = true;
      }
    });
  }

  get canSavePlace(): boolean {
    if (!this.place || !this.place.Name) {
      return false;
    }

    return this.place.Name.replace(/^[ \t\r\n]+/i, '').length > 0;
  }

  get isAddNewMode(): boolean {
    return this.editMode === PlaceEditMode.AddNew;
  }

  savePlace() {
    this.messageService.sendMessage(new SavePlaceMessage(this.place, true));
    this.isVisible = false;
  }

  private createEmptyPlace() {
    this.place = {
      Id: '',
      Name: '',
      Description: '',
      Latitude: 0.0,
      Longitude: 51.482578
    };
  }

  private async setCurrentPosition() {
    navigator.geolocation.getCurrentPosition(async position => {
      this.place.Latitude = position.coords.latitude;
      this.place.Longitude = position.coords.longitude;
    });
  }

}

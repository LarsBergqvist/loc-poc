import { Component, OnInit } from '@angular/core';
import { MessageService } from '../services/message.service';
import { filter } from 'rxjs/operators';
import { AddNewPlaceMessage } from '../messages/add-new-place.message';
import { Place } from '../models/place';

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
  editMode: PlaceEditMode.AddNew;

  constructor(private readonly messageService: MessageService) {
    this.createEmptyPlace();
  }

  private createEmptyPlace() {
    this.place = {
      Id: '',
      Name: '',
      Description: '',
      Latitude: 0.0,
      Longitude: 0.0
    };
  }

  private async setCurrentPosition() {
    navigator.geolocation.getCurrentPosition(async position => {
      console.log('got pos');
      console.log(position, null, 2);
      this.place.Latitude = position.coords.latitude;
      this.place.Longitude = position.coords.longitude;
    });
  }

  async ngOnInit() {
    const messages = this.messageService.getMessage();
    messages.pipe(filter(message => message instanceof AddNewPlaceMessage))
    .subscribe(async message  => {
      this.createEmptyPlace();
//      await this.setCurrentPosition();
      this.editMode = PlaceEditMode.AddNew;
      this.isVisible = true;
    });
  }

}

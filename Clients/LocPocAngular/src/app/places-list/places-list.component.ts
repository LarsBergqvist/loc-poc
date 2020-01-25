import { Component, OnInit } from '@angular/core';
import { PlacesService } from '../places.service';
import { Place } from '../models/place';

@Component({
  selector: 'app-places-list',
  templateUrl: './places-list.component.html',
  styleUrls: ['./places-list.component.scss']
})
export class PlacesListComponent implements OnInit {

  places: Place[];
  constructor(private readonly placesService: PlacesService) { }

  async ngOnInit() {
    this.places = await this.placesService.getPlaces();
    console.log(JSON.stringify(this.places, null, 3));
  }

}

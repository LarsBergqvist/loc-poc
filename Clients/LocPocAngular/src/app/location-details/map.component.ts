import { Component, Input, OnInit } from '@angular/core';
import { Location } from '../models/location';
import { AppConfigService } from '../services/app-config.service';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html'
})
export class MapComponent implements OnInit {
  options: any;
  map: any;

  @Input('location')
  set value(location: Location) {
    if (location) {
      if (this.map) {
        // Work with the google map object directly as modifying gmap's options
        // will not update the map
        this.map.setCenter({lat: location.Latitude, lng: location.Longitude});
        this.map.setZoom(15);
      }
    }
  }

  constructor(private readonly appConfigService: AppConfigService) {
  }

  onMapReady(event: any) {
    if (event.map) {
      this.map = event.map;
    }
  }

  ngOnInit() {
      this.options = {
          center: {lat: 51.477847, lng: 0.0},
          zoom: 15
      };
  }

  get useMap(): boolean {
    return this.appConfigService.useMap;
  }
}

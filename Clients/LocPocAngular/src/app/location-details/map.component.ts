import { Component, Input, OnInit } from '@angular/core';
import { GoogleMapsService } from '../services/googemaps.service';
import { Location } from '../models/location';
import { AppConfigService } from '../services/app-config.service';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html'
})
export class MapComponent implements OnInit {
  options: any;

  @Input('location')
  set value(location: Location) {
    if (location) {
      this.googleMapsService.loadGoogleMapsApi();

      this.options = {
        center: {lat: location.Latitude, lng: location.Longitude},
        zoom: 12
      };
    }
  }

  constructor(private readonly googleMapsService: GoogleMapsService,
              private readonly appConfigService: AppConfigService) {
    if (appConfigService.useMap) {
      googleMapsService.loadGoogleMapsApi();
    }
  }

  ngOnInit() {
      this.options = {
          center: {lat: 36.890257, lng: 30.707417},
          zoom: 12
      };
  }

  get useMap(): boolean {
    return this.appConfigService.useMap;
  }
}

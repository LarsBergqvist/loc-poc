import { Component, Input, OnInit } from '@angular/core';
import { Location } from '../models/location';
import { AppConfigService } from '../services/app-config.service';
import { MessageBrokerService } from '../services/message-broker.service';
import { NewMarkerFromMapMessage } from '../messages/new-marker-from-map.message';

declare var google: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html'
})
export class MapComponent implements OnInit {
  options: any;
  overlays: any;
  map: any;

  @Input('location')
  set value(loc: Location) {
    if (loc) {
      if (this.map) {
        // Work with the google map object directly as modifying gmap's options
        // will not update the map
        this.map.setCenter({lat: loc.Latitude, lng: loc.Longitude});
        this.overlays = [
          new google.maps.Marker({position: {lat: loc.Latitude, lng: loc.Longitude}, title: loc.Name})
        ];

      }
    }
  }

  constructor(private readonly appConfigService: AppConfigService,
              private readonly messageBroker: MessageBrokerService) {
  }

  onMapReady(event: any) {
    if (event.map) {
      this.map = event.map;
    }
  }

  handleMapClick(event) {
    this.messageBroker.sendMessage(new NewMarkerFromMapMessage(event.latLng.lat(), event.latLng.lng()));
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

import { Injectable } from '@angular/core';

import * as loadGoogleMapsApi from 'load-google-maps-api';
import { AppConfigService } from './app-config.service';

@Injectable()
class GoogleMapsService {
  constructor(private readonly appConfigService: AppConfigService) {}
  loadGoogleMapsApi() {
    return loadGoogleMapsApi({ key: this.appConfigService.googleAPIKey });
  }
}
export { GoogleMapsService };

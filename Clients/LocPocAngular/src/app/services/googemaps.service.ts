import { Injectable } from '@angular/core';

import * as loadGoogleMapsApi from 'load-google-maps-api';

@Injectable()
class GoogleMapsService {
    constructor() { }
    loadGoogleMapsApi(googleAPIKey: string) {
        return loadGoogleMapsApi({ key: googleAPIKey });
    }
}
export { GoogleMapsService };

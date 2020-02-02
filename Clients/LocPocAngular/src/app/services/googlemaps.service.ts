import { Injectable } from '@angular/core';
import * as loadGoogleMapsApi from 'load-google-maps-api';

@Injectable()
class GoogleMapsService {
    constructor() { }
    load(googleAPIKey: string): any {
        return loadGoogleMapsApi({ key: googleAPIKey });
    }
}
export { GoogleMapsService };

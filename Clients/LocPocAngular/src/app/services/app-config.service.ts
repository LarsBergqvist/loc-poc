import { Injectable } from '@angular/core';
import * as config from '../../assets/app-config.json';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {

  get apiUrl(): string {
    return config.apiUrl;
  }
  get apiPort(): string {
    return config.apiPort;
  }
  get useFakeData(): boolean {
    return config.useFakeData;
  }
  get useMap(): boolean {
    return config.useMap;
  }
}

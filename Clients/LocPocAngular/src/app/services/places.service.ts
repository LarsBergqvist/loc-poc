import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Place } from '../models/place';
import { AppConfigService } from './app-config.service';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  constructor(private readonly http: HttpClient, private readonly configService: AppConfigService) {
  }

  async getPlaces(): Promise<Place[]> {
    const baseUrl = await this.getBaseUrl();
    return this.http.get<Place[]>(`${baseUrl}api/places`).toPromise();
  }

  async saveNewPlace(place: Place): Promise<Place> {
    const baseUrl = await this.getBaseUrl();
    return this.http.post<Place>(`${baseUrl}api/places`, place).toPromise();
  }

  private async getBaseUrl(): Promise<string> {
    const config = await this.configService.getConfig();
    return `${config.apiUrl}:${config.apiPort}/`;
  }
}

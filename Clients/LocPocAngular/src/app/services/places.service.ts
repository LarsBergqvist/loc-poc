import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Place } from '../models/place';
import { AppConfigService } from './app-config.service';
import { v4 as guidgenerator } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  fakeData = [
    {
      Id: '485DCD53-90F2-441A-A8BE-8CCBF5B736AE',
      Name: 'Eiffel Tower',
      Description: 'Viva La France',
      Latitude: 48.858372,
      Longitude: 2.294481
    },
    {
      Id: '92B0912C-5417-454E-98BC-75D0A02E8B19',
      Name: 'Stockholms Stadshus',
      Description: 'Hello Stockholm',
      Latitude: 59.327422,
      Longitude: 18.054265
    },
    {
      Id: '87640EA1-ECE1-4260-A708-26ABC4F849B6',
      Name: 'Cheops pyramid',
      Description: 'Hello Egypt',
      Latitude: 29.978842,
      Longitude: 31.134358
    }
  ]
  constructor(private readonly http: HttpClient, private readonly configService: AppConfigService) {
  }

  async getPlaces(): Promise<Place[]> {
    if (await this.useFakeData()) {
      return this.fakeData;
    }

    const baseUrl = await this.getBaseUrl();
    return this.http.get<Place[]>(`${baseUrl}api/places`).toPromise();
  }

  async saveNewPlace(place: Place): Promise<Place> {
    if (await this.useFakeData()) {
      place.Id = guidgenerator;
      this.fakeData.push(place);
      return place;
    }

    const baseUrl = await this.getBaseUrl();
    return this.http.post<Place>(`${baseUrl}api/places`, place).toPromise();
  }

  private async useFakeData(): Promise<boolean> {
    const config = await this.configService.getConfig();
    return config.useFakeData;
  }

  private async getBaseUrl(): Promise<string> {
    const config = await this.configService.getConfig();
    return `${config.apiUrl}:${config.apiPort}/`;
  }
}

import { Injectable } from '@angular/core';
import { Location } from '../models/location';
import { v4 as guidgenerator } from 'uuid';
import { LocationsService } from './locations.service';
@Injectable()
export class LocationsServiceMock implements LocationsService {
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
      Name: 'Cheop\'s pyramid',
      Description: 'Hello Egypt',
      Latitude: 29.978842,
      Longitude: 31.134358
    }
  ];
  constructor() {
  }

  async getLocations(): Promise<Location[]> {
    return this.fakeData;
  }

  async saveNewLocation(location: Location): Promise<Location> {
    location.Id = guidgenerator;
    this.fakeData.push(location);
    return location;
  }

  async updateLocation(location: Location): Promise<Location> {
    const current = this.fakeData.find(l => l.Id === location.Id);
    current.Name = location.Name;
    current.Description = location.Description;
    current.Latitude = location.Latitude;
    current.Longitude = location.Longitude;
    return current;
  }

  async deleteLocation(id: string): Promise<Location> {
    this.fakeData = this.fakeData.filter(l => l.Id !== id);
    return;
  }
}

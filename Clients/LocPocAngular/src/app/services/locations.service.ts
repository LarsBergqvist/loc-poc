import { Location } from '../models/location';
import { Injectable } from '@angular/core';

export interface LocationsService {
  getLocations(): Promise<Location[]>;
  saveNewLocation(location: Location): Promise<Location>;
  updateLocation(location: Location): Promise<Location>;
  deleteLocation(id: string): Promise<Location>;
}

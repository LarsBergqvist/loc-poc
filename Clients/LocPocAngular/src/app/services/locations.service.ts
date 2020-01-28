import { Location } from '../models/location';

export interface LocationsService {
  getLocations(): Promise<Location[]>;
  saveNewLocation(location: Location): Promise<Location>;
  updateLocation(location: Location): Promise<Location>;
  deleteLocation(id: string): Promise<Location>;
}

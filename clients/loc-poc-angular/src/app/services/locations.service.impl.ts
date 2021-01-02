import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Location } from '../models/location';
import { AppConfigService } from './app-config.service';
import { LocationsService } from './locations.service';

@Injectable()
export class LocationsServiceImpl implements LocationsService {
    constructor(private readonly http: HttpClient, private readonly configService: AppConfigService) {}

    async getLocations(): Promise<Location[]> {
        const baseUrl = this.getBaseUrl();
        return this.http.get<Location[]>(`${baseUrl}api/locations`).toPromise();
    }

    async saveNewLocation(location: Location): Promise<Location> {
        const baseUrl = this.getBaseUrl();
        return this.http.post<Location>(`${baseUrl}api/locations`, location).toPromise();
    }

    async updateLocation(location: Location): Promise<Location> {
        const baseUrl = this.getBaseUrl();
        return this.http.put<Location>(`${baseUrl}api/locations/${location.id}`, location).toPromise();
    }

    async deleteLocation(id: string): Promise<Location> {
        const baseUrl = this.getBaseUrl();
        return this.http.delete<Location>(`${baseUrl}api/locations/${id}`).toPromise();
    }

    private getBaseUrl(): string {
        return `${this.configService.apiUrl}:${this.configService.apiPort}/`;
    }
}

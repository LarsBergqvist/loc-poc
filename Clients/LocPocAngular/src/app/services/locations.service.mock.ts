import { Injectable } from '@angular/core';
import { Location } from '../models/location';
import { v4 as guidgenerator } from 'uuid';
import { LocationsService } from './locations.service';
@Injectable()
export class LocationsServiceMock implements LocationsService {
    fakeData = [
        {
            id: '485DCD53-90F2-441A-A8BE-8CCBF5B736AE',
            name: 'Eiffel Tower',
            description: 'Viva La France',
            latitude: 48.858372,
            longitude: 2.294481
        },
        {
            id: '92B0912C-5417-454E-98BC-75D0A02E8B19',
            name: 'Stockholms Stadshus',
            description: 'Hello Stockholm',
            latitude: 59.327422,
            longitude: 18.054265
        },
        {
            id: '87640EA1-ECE1-4260-A708-26ABC4F849B6',
            name: 'Cheop\'s pyramid',
            description: 'Hello Egypt',
            latitude: 29.978842,
            longitude: 31.134358
        },
        {
            id: '6025A689-799F-4F30-BA6B-2833E63F5E92',
            name: 'Leaning Tower of Pisa',
            description: 'Hello Italy',
            latitude: 43.722952,
            longitude: 10.396597
        },
        {
            id: 'C5D2C105-02ED-4C39-8271-1618A7D69548',
            name: 'Taj Mahal',
            description: 'Hello India',
            latitude: 27.1751448,
            longitude: 78.0421422
        },
        {
            id: '59DEBE49-49EA-49B6-8903-8717936D5C77',
            name: 'Statue of Liberty',
            description: 'Liberty Island',
            latitude: 40.6892494,
            longitude: -74.0445004
        },
        {
            id: '3316CE8C-01E3-4AA0-92D9-E1A2202D2C96',
            name: 'Sydney Opera House',
            description: 'G\'day!',
            latitude: -33.8567844,
            longitude: 151.2152967
        },
        {
            id: 'EFG4549AD8E13-EB07-4B57-8C63-AC4C995092F7',
            name: 'Milford Sound',
            description: 'No Hobbits',
            latitude: -44.6719262260863,
            longitude: 167.926629749029
        },
        {
            id: '00AAA65A-E7E6-4D6C-A895-7BE91FFCBD90',
            name: 'Vatnajökull',
            description: 'Halló!',
            latitude: 64.3821505,
            longitude: -16.6914723
        },
        {
            id: '44907522-F1D9-4F03-A8A4-FDAC0A5D8C22',
            name: 'Akropolis',
            description: 'γειά σου!',
            latitude: 37.9715323,
            longitude: 23.7257492
        }
    ];
    constructor() {
    }

    async getLocations(): Promise<Location[]> {
        return this.fakeData;
    }

    async saveNewLocation(location: Location): Promise<Location> {
        location.id = guidgenerator;
        this.fakeData.push(location);
        return location;
    }

    async updateLocation(location: Location): Promise<Location> {
        const current = this.fakeData.find(l => l.id === location.id);
        current.name = location.name;
        current.description = location.description;
        current.latitude = location.latitude;
        current.longitude = location.longitude;
        return current;
    }

    async deleteLocation(id: string): Promise<Location> {
        this.fakeData = this.fakeData.filter(l => l.id !== id);
        return;
    }
}

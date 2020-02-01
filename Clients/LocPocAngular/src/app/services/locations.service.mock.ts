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
        },
        {
            Id: '6025A689-799F-4F30-BA6B-2833E63F5E92',
            Name: 'Leaning Tower of Pisa',
            Description: 'Hello Italy',
            Latitude: 43.722952,
            Longitude: 10.396597
        },
        {
            Id: 'C5D2C105-02ED-4C39-8271-1618A7D69548',
            Name: 'Taj Mahal',
            Description: 'Hello India',
            Latitude: 27.1751448,
            Longitude: 78.0421422
        },
        {
            Id: '59DEBE49-49EA-49B6-8903-8717936D5C77',
            Name: 'Statue of Liberty',
            Description: 'Liberty Island',
            Latitude: 40.6892494,
            Longitude: -74.0445004
        },
        {
            Id: '3316CE8C-01E3-4AA0-92D9-E1A2202D2C96',
            Name: 'Sydney Opera House',
            Description: 'G\'day!',
            Latitude: -33.8567844,
            Longitude: 151.2152967
        },
        {
            Id: 'EFG4549AD8E13-EB07-4B57-8C63-AC4C995092F7',
            Name: 'Milford Sound',
            Description: 'No Hobbits',
            Latitude: -44.6719262260863,
            Longitude: 167.926629749029
        },
        {
            Id: '00AAA65A-E7E6-4D6C-A895-7BE91FFCBD90',
            Name: 'Vatnajökull',
            Description: 'Halló!',
            Latitude: 64.3821505,
            Longitude: -16.6914723
        },
        {
            Id: '44907522-F1D9-4F03-A8A4-FDAC0A5D8C22',
            Name: 'Akropolis',
            Description: 'γειά σου!',
            Latitude: 37.9715323,
            Longitude: 23.7257492
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

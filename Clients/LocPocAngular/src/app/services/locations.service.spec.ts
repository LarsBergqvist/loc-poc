import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { LocationsService } from './locations.service';

describe('LocationsService', () => {
  let httpClient: any;

  beforeEach(() => {
    httpClient = {
      get: jasmine.createSpy('get'),
      post: jasmine.createSpy('post')
    };

    TestBed.configureTestingModule({
      providers: [
        {
          provide: HttpClient, useValue: httpClient
        }
      ]
    });
  });

  it('should be created', () => {
    const service: LocationsService = TestBed.get(LocationsService);
    expect(service).toBeTruthy();
  });
});

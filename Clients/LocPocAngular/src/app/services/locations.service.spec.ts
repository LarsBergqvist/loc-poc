import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { LocationsServiceImpl } from './locations.service.impl';

describe('LocationsServiceImpl', () => {
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
    const service: LocationsServiceImpl = TestBed.get(LocationsServiceImpl);
    expect(service).toBeTruthy();
  });
});

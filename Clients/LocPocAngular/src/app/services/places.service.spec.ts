import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { PlacesService } from './places.service';

describe('PlacesService', () => {
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
    const service: PlacesService = TestBed.get(PlacesService);
    expect(service).toBeTruthy();
  });
});

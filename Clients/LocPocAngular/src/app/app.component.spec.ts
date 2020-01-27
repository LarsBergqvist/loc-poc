import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PlacesService } from './services/places.service';

describe('AppComponent', () => {
  let placesService: any;

  beforeEach(async(() => {
    placesService = {
      getPlaces: jasmine.createSpy('getPlaces'),
      saveNewPlace: jasmine.createSpy('saveNewPlace')
    };
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        { provide: PlacesService, useValue: placesService }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});

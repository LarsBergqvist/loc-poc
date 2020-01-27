import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlacesListComponent } from './places-list.component';
import { TableModule } from 'primeng/table';
import { PlacesService } from '../services/places.service';

describe('PlacesListComponent', () => {
  let component: PlacesListComponent;
  let fixture: ComponentFixture<PlacesListComponent>;
  let placesService: any;

  beforeEach(async(() => {
    placesService = {
      getPlaces: jasmine.createSpy('getPlaces'),
      saveNewPlace: jasmine.createSpy('saveNewPlace')
    };
    TestBed.configureTestingModule({
      imports: [
        TableModule
      ],
      providers: [
        { provide: PlacesService, useValue: placesService }
      ],

      declarations: [ PlacesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlacesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

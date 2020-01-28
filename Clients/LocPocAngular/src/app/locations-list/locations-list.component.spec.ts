import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationsListComponent } from './locations-list.component';
import { TableModule } from 'primeng/table';
import { LocationsService } from '../services/locations.service';

describe('LocationsListComponent', () => {
  let component: LocationsListComponent;
  let fixture: ComponentFixture<LocationsListComponent>;
  let locationsService: any;

  beforeEach(async(() => {
    locationsService = {
      getLocations: jasmine.createSpy('getLocations'),
      saveNewLocation: jasmine.createSpy('saveNewLocation')
    };
    TestBed.configureTestingModule({
      imports: [
        TableModule
      ],
      providers: [
        { provide: LocationsService, useValue: locationsService }
      ],

      declarations: [ LocationsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

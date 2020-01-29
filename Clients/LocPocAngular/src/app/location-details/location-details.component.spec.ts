import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationDetailsComponent } from './location-details.component';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('LocationDetailsComponent', () => {
  let component: LocationDetailsComponent;
  let fixture: ComponentFixture<LocationDetailsComponent>;
  let locationsService: any;

  beforeEach(async(() => {
    locationsService = {
      getLocations: jasmine.createSpy('getLocations'),
      saveNewLocation: jasmine.createSpy('saveNewLocation')
    };

    TestBed.configureTestingModule({
      imports: [
        InputTextModule, ButtonModule, SidebarModule, FormsModule, BrowserAnimationsModule
      ],
      providers: [
        { provide: 'LocationsService', useValue: locationsService }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [ LocationDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

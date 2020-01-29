import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MessageService } from 'primeng/components/common/messageservice';

describe('AppComponent', () => {
  let locationsService: any;
  let primeNGmessageService: any;

  beforeEach(async(() => {
    locationsService = {
      getLocations: jasmine.createSpy('getLocations'),
      saveNewLocation: jasmine.createSpy('saveNewLocation')
    };
    primeNGmessageService = {
      add: jasmine.createSpy('add')
    };
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        { provide: 'LocationsService', useValue: locationsService },
        { provide: MessageService, useValue: primeNGmessageService }
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

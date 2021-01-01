import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LocationDetailsComponent } from './location-details.component';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppConfigService } from '../services/app-config.service';
import { NumberRangeValidator } from '../validators/number-range.validator';
import { LoggingService } from '../services/logging-service';

describe('LocationDetailsComponent', () => {
    let component: LocationDetailsComponent;
    let fixture: ComponentFixture<LocationDetailsComponent>;
    let locationsService: any;
    let appConfigService: any;

    beforeEach(waitForAsync(() => {
        locationsService = {
            getLocations: jasmine.createSpy('getLocations'),
            saveNewLocation: jasmine.createSpy('saveNewLocation')
        };
        appConfigService = {
            useMap: jasmine.createSpy('useMap')
        };

        TestBed.configureTestingModule({
            imports: [
                InputTextModule, ButtonModule, SidebarModule, FormsModule, BrowserAnimationsModule,
            ],
            providers: [
                { provide: 'LocationsService', useValue: locationsService },
                { provide: AppConfigService, useValue: appConfigService },
                { provide: LoggingService, useClass: LoggingService }
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            declarations: [LocationDetailsComponent, NumberRangeValidator]
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

import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LocationsListComponent } from './locations-list/locations-list.component';
import { AppConfigService } from './services/app-config.service';

import { TableModule } from 'primeng/table';
import { GMapModule } from 'primeng/gmap';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { SplitButtonModule } from 'primeng/splitbutton';
import { SidebarModule } from 'primeng/sidebar';
import { InputTextModule } from 'primeng/inputtext';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';

import { AppBarComponent } from './app-bar/app-bar.component';
import { LocationDetailsComponent } from './location-details/location-details.component';
import { FormsModule } from '@angular/forms';
import { LocationsService } from './services/locations.service';
import { LocationsServiceImpl } from './services/locations.service.impl';
import { LocationsServiceMock } from './services/locations.service.mock';
import { MapComponent } from './location-details/map.component';
import { GoogleMapsService } from './services/googlemaps.service';
import { HttpInterceptorService } from './services/http-interceptor.service';
import { MessageBrokerService } from './services/message-broker.service';
import { MessageService } from 'primeng/components/common/messageservice';
import { NumberRangeValidator } from './validators/number-range.validator';
import { LoggingService } from './services/logging-service';

export function locationsServiceFactory() {
    return (http: HttpClient, configService: AppConfigService, logging: LoggingService): LocationsService => {
        if (configService.useFakeData) {
            logging.logInfo('use mock service');
            return new LocationsServiceMock();
        } else {
            logging.logInfo('use real service');
            return new LocationsServiceImpl(http, configService);
        }
    };
}

export function appConfigInit(configService: AppConfigService,
                              googleMapService: GoogleMapsService, logging: LoggingService) {
    // Load the configuration and init google api if maps should be used
    return (): Promise<any> => {
        return new Promise((resolve) => {
            configService.load().then(() => {
                if (configService.useMap) {
                    logging.logInfo('Use map');
                    googleMapService.loadGoogleMapsApi(configService.googleAPIKey).then(() => {
                        resolve();
                    });
                } else {
                    logging.logInfo('no map');
                    resolve();
                }
            });
        });
    };
}

@NgModule({
    declarations: [
        AppComponent,
        LocationsListComponent,
        AppBarComponent,
        LocationDetailsComponent,
        MapComponent,
        NumberRangeValidator
    ],
    providers: [
        AppConfigService,
        GoogleMapsService,
        LoggingService,
        {
            provide: APP_INITIALIZER,
            useFactory: appConfigInit,
            multi: true,
            deps: [AppConfigService, GoogleMapsService, LoggingService]
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpInterceptorService,
            multi: true,
            deps: [MessageBrokerService]
        },
        {
            provide: 'LocationsService', useFactory: locationsServiceFactory(),
            deps: [HttpClient, AppConfigService, LoggingService]
        },
        MessageService
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        TableModule,
        GMapModule,
        ToolbarModule,
        ButtonModule,
        SplitButtonModule,
        SidebarModule,
        InputTextModule,
        FormsModule,
        MessagesModule,
        MessageModule,
        ToastModule,
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }

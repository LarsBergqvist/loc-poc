import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LocationsListComponent } from './locations-list/locations-list.component';
import { AppConfigService } from './services/app-config.service';

import {TableModule} from 'primeng/table';
import {GMapModule} from 'primeng/gmap';
import {ToolbarModule} from 'primeng/toolbar';
import {ButtonModule} from 'primeng/button';
import {SplitButtonModule} from 'primeng/splitbutton';
import {SidebarModule} from 'primeng/sidebar';
import {InputTextModule} from 'primeng/inputtext';

import { AppBarComponent } from './app-bar/app-bar.component';
import { LocationDetailsComponent } from './location-details/location-details.component';
import { FormsModule } from '@angular/forms';
import { LocationsService } from './services/locations.service';
import { LocationsServiceImpl } from './services/locations.service.impl';
import { LocationsServiceMock } from './services/locations.service.mock';
@NgModule({
  declarations: [
    AppComponent,
    LocationsListComponent,
    AppBarComponent,
    LocationDetailsComponent
  ],
  providers: [
    AppConfigService,
    { provide: LocationsServiceImpl,    useFactory:  locationsServiceFactory(), deps: [HttpClient, AppConfigService] }
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
    FormsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
export function locationsServiceFactory() {
  return (http: HttpClient, configService: AppConfigService): LocationsService => {
    if (configService.useFakeData) {
      return new LocationsServiceMock();
    } else {
      return new LocationsServiceImpl(http, configService);
    }
  };
}

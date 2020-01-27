import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlacesListComponent } from './places-list/places-list.component';
import { AppConfigService } from './services/app-config.service';

import {TableModule} from 'primeng/table';
import {GMapModule} from 'primeng/gmap';
import {ToolbarModule} from 'primeng/toolbar';
import {ButtonModule} from 'primeng/button';
import {SplitButtonModule} from 'primeng/splitbutton';
import {SidebarModule} from 'primeng/sidebar';
import {InputTextModule} from 'primeng/inputtext';

import { AppBarComponent } from './app-bar/app-bar.component';
import { PlaceDetailsComponent } from './place-details/place-details.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    PlacesListComponent,
    AppBarComponent,
    PlaceDetailsComponent
  ],
  providers: [
    AppConfigService,
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

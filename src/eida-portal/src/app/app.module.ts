import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { StationsComponent } from './stations/stations.component';
import { EventsComponent } from './events/events.component';
import { ConsoleComponent } from './console/console.component';
import { MapComponent } from './map/map.component';
import { AppRoutingModule } from './/app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RequestComponent } from './request/request.component';

@NgModule({
  declarations: [
    AppComponent,
    StationsComponent,
    EventsComponent,
    ConsoleComponent,
    MapComponent,
    DashboardComponent,
    RequestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

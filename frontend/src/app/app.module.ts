import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HouseVisualizerComponent} from "../components/house-visualizer/house-visualizer.component";
import {InfoCardComponent} from "../components/house-visualizer/info-card/info-card.component";

@NgModule({
  declarations: [
    AppComponent,
    HouseVisualizerComponent,
    InfoCardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HousingVisualizerComponent} from "../components/housing-visualizer/housing-visualizer.component";
import {ImageCardComponent} from "../components/housing-visualizer/image-card/image-card.component";

@NgModule({
    declarations: [
        AppComponent,
        HousingVisualizerComponent,
        ImageCardComponent,
    ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HousingVisualizerComponent} from "../components/housing-visualizer/housing-visualizer.component";
import {ImageCardComponent} from "../components/housing-visualizer/images-card/image-card.component";
import {
    HousingInfoDisplayerComponent
} from "../components/housing-visualizer/housing-info-displayer/housing-info-displayer.component";

@NgModule({
    declarations: [
        AppComponent,
        HousingVisualizerComponent,
        ImageCardComponent,
        HousingInfoDisplayerComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HousingVisualizerComponent} from "../components/housing-visualizer/housing-visualizer.component";
import {ImageCardComponent} from "../components/housing-visualizer/images-card/image-card.component";
import {
    HousingInfoDisplayerComponent
} from "../components/housing-visualizer/housing-info-displayer/housing-info-displayer.component";
import {HomeStayListComponent} from "../components/home-stay-list/home-stay-list.component";
import {HomeStaySearcherComponent} from "../components/home-stay-list/home-stay-searcher/home-stay-searcher.component";

@NgModule({
    declarations: [
        AppComponent,
        HousingVisualizerComponent,
        ImageCardComponent,
        HousingInfoDisplayerComponent,
        HomeStayListComponent,
        HomeStaySearcherComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

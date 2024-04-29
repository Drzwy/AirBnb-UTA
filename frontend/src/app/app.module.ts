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
import {HomeTypeButtonsComponent} from "../components/home-stay-list/home-type-buttons/home-type-buttons.component";
import {AdvancedFilterComponent} from "../components/home-stay-list/advanced-filter/advanced-filter.component";
import {FormsModule} from "@angular/forms";
import {HomeStayFinderComponent} from "../components/home-stay-list/home-stay-finder/home-stay-finder.component";

@NgModule({
    declarations: [
        AppComponent,
        HousingVisualizerComponent,
        ImageCardComponent,
        HousingInfoDisplayerComponent,
        HomeStayListComponent,
        HomeTypeButtonsComponent,
        AdvancedFilterComponent,
        HomeStayFinderComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

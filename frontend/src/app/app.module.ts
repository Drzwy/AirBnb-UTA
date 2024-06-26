import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HousingVisualizerComponent } from '../components/housing-visualizer/housing-visualizer.component';
import { ImageCardComponent } from '../components/housing-visualizer/images-card/image-card.component';
import { HousingInfoDisplayerComponent } from '../components/housing-visualizer/housing-info-displayer/housing-info-displayer.component';
import { HousingReservationComponent } from '../components/housing-visualizer/housing-reservation/housing-reservation.component';
import { HomeStayListComponent } from '../components/home-stay-list/home-stay-list.component';
import { HomeTypeButtonsComponent } from '../components/home-stay-list/home-type-buttons/home-type-buttons.component';
import { AdvancedFilterComponent } from '../components/home-stay-list/advanced-filter/advanced-filter.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeStayFinderComponent } from '../components/home-stay-list/home-stay-finder/home-stay-finder.component';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { RegisterComponent } from '../components/register/register.component';
import { LoginComponent } from '../components/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { CalendarModule } from 'primeng/calendar';
import { CalendarComponent } from '../components/calendar/calendar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddHomeStayComponent } from '../components/add-home-stay/add-home-stay.component';
import { HostInfoViewComponent } from '../components/host-info-view/host-info-view.component';
import { SliderModule } from 'primeng/slider';
import { EditHomeStayComponent } from '../components/edit-home-stay/edit-home-stay.component';
import { HostMainViewComponent } from '../components/host-main-view/host-main-view.component';
import { MessageComponent } from '../components/message/message.component';
import { BookingViewComponent } from '../components/booking-view/booking-view.component';
import { AcceptRejectStayViewComponent } from '../components/host-main-view/accept-reject-stay-view/accept-reject-stay-view.component';
import { AccountViewComponent } from '../components/account-view/account-view.component';
import { StayRequestsComponent } from '../components/stay-requests/stay-requests.component';

@NgModule({
  declarations: [
    AppComponent,
    HousingVisualizerComponent,
    ImageCardComponent,
    HousingInfoDisplayerComponent,
    HousingReservationComponent,
    HostInfoViewComponent,
    NavbarComponent,
    HomeStayListComponent,
    HomeTypeButtonsComponent,
    AdvancedFilterComponent,
    HomeStayFinderComponent,
    RegisterComponent,
    LoginComponent,
    CalendarComponent,
    AddHomeStayComponent,
    EditHomeStayComponent,
    HostMainViewComponent,
    MessageComponent,
    BookingViewComponent,
    AcceptRejectStayViewComponent,
    AccountViewComponent,
    StayRequestsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CalendarModule,
    BrowserAnimationsModule,
    SliderModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

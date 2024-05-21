import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HousingVisualizerComponent } from '../components/housing-visualizer/housing-visualizer.component';
import { HomeStayListComponent } from '../components/home-stay-list/home-stay-list.component';
import { LoginComponent } from '../components/login/login.component';
import { RegisterComponent } from '../components/register/register.component';
import { adminGuard, authGuard, hostGuard, loginGuard } from '../guards/auth.guard';
import { CalendarComponent } from '../components/calendar/calendar.component';
import { HousingReservationComponent } from '../components/housing-visualizer/housing-reservation/housing-reservation.component';
// import { AddHomeStayComponent } from '../components/add-home-stay/add-home-stay.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch:'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [loginGuard]
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [loginGuard]
  },
  {
    path: 'home-stay-list',
    component: HomeStayListComponent,
    canActivate: [authGuard]
  },
  {
    path: 'housing-visualizer',
    component: HousingVisualizerComponent,
    canActivate: [authGuard]
  },
  // {
  //   path: 'add-home-stay',
  //   component: AddHomeStayComponent,
  //   // canActivate: [authGuard, hostGuard]
  // },
  {
    path: 'calendar',
    component: CalendarComponent,
  },
  {
    path: 'reservation',
    component: HousingReservationComponent,
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'ignore'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

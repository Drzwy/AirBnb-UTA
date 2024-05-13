import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HousingVisualizerComponent } from '../components/housing-visualizer/housing-visualizer.component';
import { HomeStayListComponent } from '../components/home-stay-list/home-stay-list.component';
import { AddHomeStayComponent } from '../components/add-home-stay/add-home-stay.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home-stay-list', //mandar al login cuando exista xd
    pathMatch:'full'
  },
  // {
  //   path: 'login',
  //   component: LoginComponent,
  //   canActivate[loginGuard]
  // },
  {
    path: 'home-stay-list',
    component: HomeStayListComponent,
    // canActivate: [authGuard]
  },
  {
    path: 'housing-visualizer',
    component: HousingVisualizerComponent,
    // canActivate: [authGuard]
  },
   {
     path: 'add-home-stay',
     component: AddHomeStayComponent,
     // canActivate: [authGuard]
   },
  {
    path: '**',
    redirectTo: 'home-stay-list', //mandar al login
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'ignore'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

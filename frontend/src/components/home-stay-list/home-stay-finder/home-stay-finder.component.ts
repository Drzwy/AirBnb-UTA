import { Component } from '@angular/core';

@Component({
  selector: 'app-home-stay-finder',
  templateUrl: './home-stay-finder.component.html',
  styleUrl: './home-stay-finder.component.css',
})
export class HomeStayFinderComponent {
  public currentWhere: string = '';
  public currentArrival: Date = new Date();
  public currentFinish: Date = new Date();
  public currentHowMany: string = '';

  readonly CONSTANTS = {
    where: 'Dónde',
    arrival: 'Llegada',
    finish: 'Salida',
    howMany: 'Quién',
    wherePlaceHolder: 'Explora Destinos',
    howManyPlaceHolder: '¿Cuántos?',
  };
}

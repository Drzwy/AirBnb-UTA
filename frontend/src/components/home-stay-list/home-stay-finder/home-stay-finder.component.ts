import { Component } from '@angular/core';

@Component({
  selector: 'app-home-stay-finder',
  templateUrl: './home-stay-finder.component.html',
  styleUrl: './home-stay-finder.component.css',
})
export class HomeStayFinderComponent {
  public currentWhere: string = '';
  public currentArrival: Date | null = null;
  public currentFinish: Date | null = null ;
  public currentHowMany: string = '';
  public guestsAdults: number = 0;
  public guestsChildren: number = 0;
  public guestsInfants: number = 0;
  public guestsPets: number = 0;



  readonly CONSTANTS = {
    where: 'Dónde',
    arrival: 'Llegada',
    finish: 'Salida',
    howMany: 'Quién',
    wherePlaceHolder: 'Explora Destinos',
    howManyPlaceHolder: '¿Cuántos?',
  };
  
  public guests = {
    adults: 0,
    children: 0,
    infants: 0,
    pets: 0,
  };

  public onStartDateSelected(date: any) {
    this.currentArrival = date;
  }

  public onEndDateSelected(date: any) {
    this.currentFinish = date;
  }

  public formatGuests(): string {
    let guestString = '';
    let guestCount = 0;

    // Lista de tipos de huéspedes
    const guestTypes = [
      { name: 'huésped', count: this.guests.adults + this.guests.children },
      { name: 'bebé', count: this.guests.infants },
      { name: 'mascota', count: this.guests.pets },
    ];

    // Filtra y agrega tipos de huéspedes a la cadena
    guestTypes.forEach((guest, index) => {
      if (guest.count > 0) {
        if (guestCount > 0) {
          guestString += ', ';
        }
        guestString += `${guest.count} ${guest.name}`;
        if (guest.count !== 1) {
          if (guest.name === 'huésped') {
            guestString += 'es';
          } else {
            guestString += 's';
          }
        }

        guestCount++;
      }
    });

    return guestString;
  }

}

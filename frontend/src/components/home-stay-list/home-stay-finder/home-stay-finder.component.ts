import { Component } from '@angular/core';
import { HomeDisplayService } from '../../../services/home-display.service';

@Component({
  selector: 'app-home-stay-finder',
  templateUrl: './home-stay-finder.component.html',
  styleUrl: './home-stay-finder.component.css',
})
export class HomeStayFinderComponent {
  public currentCity: string = '';
  public currentCountry: string = ''
  public dates: (Date|null)[]= []
  public guestsAdults: number = 0;
  public guestsChildren: number = 0;
  public guestsInfants: number = 0;
  public guestsPets: number = 0;

  constructor(
    private service: HomeDisplayService
  ){}

  readonly CONSTANTS = {
    where: 'Dónde',
    arrival: 'Llegada',
    finish: 'Salida',
    howMany: 'Quién',
    howManyPlaceHolder: '¿Cuántos?',
  };
  
  public guests = {
    adults: 0,
    children: 0,
    infants: 0,
    pets: 0,
  };

  public onRangeSelected(date: any) {
    this.dates = date;
  }

  public filter() {
    let filter = ''
    if(this.currentCity != ''){
      filter = `${filter}ciudad=${this.currentCity.toLowerCase()}&`
    }
    if(this.currentCountry != ''){
      filter = `${filter}pais=${this.currentCountry.toLowerCase()}&`
    }
    if(this.guests.adults != 0){
      filter = `${filter}nroAdultos=${this.guests.adults}&`
    }
    if(this.guests.children != 0){
      filter = `${filter}nroNinos=${this.guests.children}&`
    }
    if(this.guests.infants != 0){
      filter = `${filter}nroBebes=${this.guests.infants}&`
    }
    if(this.guests.pets != 0){
      filter = `${filter}nroMascotas=${this.guests.pets}&`
    }
    if(this.dates[0] != null){
      filter = `${filter}fechaInicio=${this.dates[0].toISOString().split('T')[0]}&`
    }
    if(this.dates[1] != null){
      filter = `${filter}fechaFin=${this.dates[1].toISOString().split('T')[0]}&`
    }

    this.service.filterHomestays(filter)
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

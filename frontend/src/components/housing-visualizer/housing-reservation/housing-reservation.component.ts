import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { BookingService } from '../../../services/booking.service';
import { UserGlobalPreferencesService } from '../../../services/user-global-preferences.service';

@Component({
  selector: 'app-housing-reservation',
  templateUrl: './housing-reservation.component.html',
  styleUrls: ['./housing-reservation.component.css'],
})
export class HousingReservationComponent implements OnInit {
  constructor(
    private router: Router,
    private bookingServ: BookingService,
    private userServ: UserGlobalPreferencesService
  ) {
    this.nights = 0;
    this.houseName = '';
    this.houseType = '';
    this.id = -1;
    this.houseId = -1;
    this.houseImg = '';
  }

  ngOnInit(): void {
    this.userServ.getCurrentUser().subscribe(response =>{
      this.id = response.id
    })
  }

  @Input() public housingPrice: HousingPrice = {
    pricePerNight: 0,
    cleaningFee: 0,
    airbnbServiceFee: 0,
  };

  @Input() public houseId:number;
  @Input() public houseName:string;
  @Input() public houseType:string;
  @Input() public houseImg: string;
  @Input() public invalidDates:Date[] = [];
  @Input() public rating: string = '';
  @Input() public numberReviews: number = -1;
  @Input() public maxGuests!: Guests

  public dates: (Date|null)[] = []
  public nights: number;
  public id: number;

  public partialHousingPrices: string[] = [];

  public typeOfPrice: string[] = [
    ' x noche',
    'Tarifa de limpieza',
    'Tarifa por servicio de Airbnb',
  ];

  public guests: Guests = {
    adults: 1,
    children: 0,
    infants: 0,
    pets: 0,
  };

  public increment(field: string): void {
    if(field == 'adults' || field == 'children'){
      if(this.guests.adults + this.guests.children < this.maxGuests.adults + this.maxGuests.children){
        this.guests[field as keyof Guests] += 1; 
      }
    } else {
      if(this.guests[field as keyof Guests] < this.maxGuests[field as keyof Guests]){
        this.guests[field as keyof Guests] += 1;
      } 
    }
  }

  public decrement(field: string): void {
    if(field == 'adults'){
      if(this.guests.adults > 1){
        this.guests.adults -=1
      }
    } else{
      if(this.guests[field as keyof Guests] > 0){
        this.guests[field as keyof Guests] -= 1; 
      }
    }
  }

  public toNumber(number: string) {
    return parseFloat(number.replace(/\D/g, ''));
  }

  public getPrice(): void {
    let prices: string[] = [];
    let text: string;

    text =
      '$' + (this.housingPrice.pricePerNight * this.nights).toLocaleString('en-US') + ' CLP';
    prices.push(text);

    text = '$' + (this.housingPrice.pricePerNight * this.nights * this.housingPrice.cleaningFee).toLocaleString('en-US') + ' CLP';
    prices.push(text);

    text =
      '$' + (this.housingPrice.pricePerNight * this.nights * this.housingPrice.airbnbServiceFee).toLocaleString('en-US') + ' CLP';
    prices.push(text);

    this.partialHousingPrices = prices;
  }

  public priceWithoutTaxes(): string {
    let priceWithTaxes: number = Math.round(
      this.housingPrice.pricePerNight * this.nights +
      this.housingPrice.cleaningFee * this.housingPrice.pricePerNight* this.nights +
      this.housingPrice.airbnbServiceFee * this.housingPrice.pricePerNight * this.nights);
    return '$' + priceWithTaxes.toLocaleString('en-US') + ' CLP';
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

  public onRangeSelected(date: any) {
    this.dates = date;
  }

  public onNightsSelected(nights: any) {
    this.nights = nights;
    this.getPrice();
  }

  public reserve() {
    let partialPrices: any;
    let reservation: Reservation;
    if (this.dates[0] && this.dates[1]) {
      partialPrices = this.partialHousingPrices.map((price, index) => ({
        type: this.typeOfPrice[index],
        price: this.toNumber(price),
      }));
      reservation = {
        startDate: this.dates[0],
        endDate: this.dates[1],
        nights: this.nights,
        pricePerNight: this.housingPrice.pricePerNight,
        guests: this.guests,
        partialPrices: partialPrices,
        paymentMethodId: 1,
        payerId: this.id,
        id: this.id,
        houseId: this.houseId,

        totalPrice: this.toNumber(this.priceWithoutTaxes()),
      };
    this.router.navigate([`booking/${this.houseId}`]).then(() => {
      window.scrollTo(0, 0);
    });;
    this.bookingServ.addReservation(reservation)
    this.bookingServ.addHouseInfo(this.houseName, this.houseType, this.houseImg, this.maxGuests)
    this.bookingServ.addInvalidDates(this.invalidDates)
    this.bookingServ.addReviews(this.rating, this.numberReviews)
    }
  }

  public checkAvailability() {
    console.log('comprobar');
  }
}

export interface HousingPrice {
  pricePerNight: number;
  cleaningFee: number;
  airbnbServiceFee: number;
}

export interface Guests {
  adults: number;
  children: number;
  infants: number;
  pets: number;
}

export interface Reservation {
  startDate: Date;
  endDate: Date;
  nights: number;
  pricePerNight: number;
  guests: Guests;
  partialPrices: any;
  paymentMethodId: number,
  payerId: number,
  id: number,
  houseId: number,
  
  totalPrice: number; // este no se envia al backend
}

import { Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-housing-reservation',
  templateUrl: './housing-reservation.component.html',
  styleUrls: ['./housing-reservation.component.css']
})
export class HousingReservationComponent  implements OnInit{
  
  constructor() {
    this.startDate = null;
    this.endDate = null;
    this.nights = 0;
    this.rules = ""
  }

  ngOnInit(): void {
    this.getPrice();
  }

  @Input() public housingPrice: HousingPrice = {
      pricePerNight: 0,
      cleaningFee: 0,
      airbnbServiceFee: 0
  };

  @Input() public rules: string;

  public startDate: Date | null;
  public endDate: Date | null;
  public nights: number;
  

  public partialHousingPrices: string[] = [];

  public typeOfPrice: string[] = [
    " x noche",
    "Tarifa de limpieza",
    "Tarifa por servicio de Airbnb"
  ]

  public guests: any = {
    adults: 1,
    children: 0,
    infants: 0,
    pets: 0
  };

  public toNumber(number: string){
    return parseFloat(number.replace(/\D/g, ''));
  }

  public getPrice(): void{
    let prices: string[] = [];
    let text: string;
     
    text = "$"+this.housingPrice.pricePerNight.toLocaleString('en-US') + " CLP"
    prices.push(text)

    text = "$"+this.housingPrice.cleaningFee.toLocaleString('en-US') + " CLP"
    prices.push(text)

    text = "$"+this.housingPrice.airbnbServiceFee.toLocaleString('en-US') + " CLP"
    prices.push(text)

    this.partialHousingPrices = prices;
  };

  public priceWithoutTaxes(): string {
    let priceWithTaxes: number = (this.housingPrice.pricePerNight * this.nights)+ (this.housingPrice.cleaningFee  * this.nights) +(this.housingPrice.airbnbServiceFee  * this.nights);
    return "$" + priceWithTaxes.toLocaleString('en-US') + " CLP";
  }

  public formatGuests(): string {
    let guestString = '';
    let guestCount = 0;

    // Lista de tipos de huéspedes
    const guestTypes = [
        { name: 'huésped', count: this.guests.adults + this.guests.children },
        { name: 'bebé', count: this.guests.infants },
        { name: 'mascota', count: this.guests.pets }
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

  public onStartDateSelected(date: any) {
    console.log("entro")
    this.startDate = date;
    console.log('Fecha de inicio seleccionada:', this.startDate);
    // Aquí puedes realizar cualquier acción necesaria con la fecha de inicio seleccionada
  }

  public onEndDateSelected(date: any) {
    this.endDate = date;
    console.log('Fecha de fin seleccionada:', this.endDate);
    // Aquí puedes realizar cualquier acción necesaria con la fecha de fin seleccionada
  }

  public onNightsSelected(nigths: any) {
    this.nights = nigths;
    console.log('Fecha de fin seleccionada:', this.nights);
    // Aquí puedes realizar cualquier acción necesaria con la fecha de fin seleccionada
  }
  
  public reserve(){
    console.log("reservar");
    let partialPrices: any;
    let reservation: Reservation;
    if(this.startDate && this.endDate){
      partialPrices = this.partialHousingPrices.map((price, index) => ({
        type: this.typeOfPrice[index],
        price: this.toNumber(price) * this.nights
      }))
      reservation = {
        guests: this.guests,
        startDate: this.startDate,
        endDate:this.endDate,
        nights: this.nights,
        partialPrices: partialPrices,
        totalPrice: this.toNumber(this.priceWithoutTaxes())
      };
      console.log(reservation);
    }
  }

  public checkAvailability(){
    console.log("comprobar");
  }

}

export interface HousingPrice {
  pricePerNight: number,
  cleaningFee: number,
  airbnbServiceFee: number,
}

export interface Guests {
  adults: number,
  children: number,
  infants: number,
  pets: number,
}

export interface Reservation {
  guests: Guests,
  startDate: Date,
  endDate:Date,
  nights: number,
  partialPrices: any,
  totalPrice: number
}

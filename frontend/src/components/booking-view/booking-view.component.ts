import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingService } from '../../services/booking.service';
import { Guests, Reservation } from '../housing-visualizer/housing-reservation/housing-reservation.component';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-booking-view',
  templateUrl: './booking-view.component.html',
  styleUrls: ['./booking-view.component.css']
})
export class BookingViewComponent implements OnInit {

  constructor(
    private router: Router,
    private bookingService: BookingService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.bookingService.getReservation().subscribe(response =>{
      this.reservation = response;
    });
    if(!this.reservation){
      this.route.params.subscribe(params => {
        this.indice = +params['id'];
      });
      this.router.navigateByUrl(`housing-visualizer/${this.indice}`)
    }
    this.bookingService.getHouseInfo().subscribe(response =>{
      this.houseInfo = response;
    });
    this.getInvalidDates()
    this.getReviews()
  }

  public indice: number = -1
  public paymentMethodForm: FormGroup = new FormGroup({
    cardNumber: new FormControl('', [Validators.required, Validators.minLength(19), Validators.maxLength(19)]),
    expDate: new FormControl('', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/([0-9]{2})$/), expirationDateValidator()]),
    cvv: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(3)])
  })
  public reservation!: Reservation
  public houseInfo!: any[]
  public invalidDates!: Date[]
  public rating: string = ''
  public numberReviews: number = -1
  public cardId: number = -2
  public cards: any = [1,2,3,4] //cambiar cuando hayan  tarjetas

  public increment(field: string): void {
    if(field == 'adults' || field == 'children'){
      if(this.reservation.guests.adults + this.reservation.guests.children < this.houseInfo[3].adults + this.houseInfo[3].children){
        this.reservation.guests[field as keyof Guests] += 1; 
      }
    } else {
      if(this.reservation.guests[field as keyof Guests] < this.houseInfo[3][field as keyof Guests]){
        this.reservation.guests[field as keyof Guests] += 1;
      } 
    }
  }

  public decrement(field: string): void {
    if(field == 'adults'){
      if(this.reservation.guests.adults > 1){
        this.reservation.guests.adults -=1
      }
    } else{
      if(this.reservation.guests[field as keyof Guests] > 0){
        this.reservation.guests[field as keyof Guests] -= 1; 
      }
    }
  }

  public formatGuests(): string {
    let guestString = '';
    let guestCount = 0;

    // Lista de tipos de huéspedes
    const guestTypes = [
      { name: 'huésped', count: this.reservation.guests.adults + this.reservation.guests.children },
      { name: 'bebé', count: this.reservation.guests.infants },
      { name: 'mascota', count: this.reservation.guests.pets },
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

  public getReviews(){
    const reviews = this.bookingService.getReviews()
    this.rating = reviews.rating
    this.numberReviews = reviews.numberReviews
  }
  public getInvalidDates(){
    this.invalidDates = this.bookingService.getInvalidDates()
  }

  public formatCardNumber(event: Event): void {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, ''); // saca los otros caracteres

    const formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
    input.value = formattedValue;

    // actualiza el valor en el input
    this.paymentMethodForm.get('cardNumber')?.setValue(formattedValue, { emitEvent: false });
  }

  public formatExpirationDate(event: Event): void {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, ''); // saca los caracteres
  
    if (value.length > 2) {
      value = `${value.substring(0, 2)}/${value.substring(2)}`;
    }
    input.value = value;
    this.paymentMethodForm.get('expiration')?.setValue(value, { emitEvent: false });
  }

  public formatCVV(event: Event): void {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, ''); // saca los caracteres
    input.value = value;
    this.paymentMethodForm.get('expiration')?.setValue(value, { emitEvent: false });
  }

  public onRangeSelected(date: any) {
    this.reservation.startDate = date[0];
    this.reservation.endDate = date[1]
  }

  public onNightsSelected(nights: any) {
    this.reservation.nights = nights;
    this.newPrices()
  }

  public newPrices(){
    this.reservation.partialPrices[0].price = this.reservation.pricePerNight * this.reservation.nights;
    this.reservation.partialPrices[1].price = this.reservation.pricePerNight * this.reservation.nights * 0.08;
    this.reservation.partialPrices[2].price = this.reservation.pricePerNight * this.reservation.nights * 0.14;
    let total = 0
    for (let i = 0; i < 3; i++){
      total += this.reservation.partialPrices[i].price
    }
    this.reservation.totalPrice = total
  }

  public booking(){
    this.reservation.paymentMethodId = this.cardId
    this.bookingService.booking().subscribe(result =>{
      if (result && result.success) {
        alert('Se ha registrado la reserva');
        this.router.navigateByUrl('home-stay-list')
      } else {
        alert(result.message);
      }
    })
  }

  public addCard(){
    const card = {
      cardNumber: this.paymentMethodForm.get('cardNumber')?.value,
      expDate: this.paymentMethodForm.get('expDate')?.value,
      cvv: this.paymentMethodForm.get('cvv')?.value,
    }
    this.bookingService.addCard(card)
  }

  public back(){
    console.log(this.reservation.houseId)
    this.router.navigateByUrl(`housing-visualizer/${this.reservation.houseId}`)
  }
}

export function expirationDateValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) {
      return null; //si esta vacio
    }
    // Extraer mes y año
    const parts = value.split('/');
    const month = parseInt(parts[0], 10);
    const year = parseInt(parts[1], 10);
    console.log(year, 'mes fuera')
    console.log(year, 'año fuera')
    // Verificar mes válido (01-12)
    if (month < 1 || month > 12) {
      console.log(month, 'mes dentro')
      return { invalidExpirationDate: true }; // Mes inválido
    }
    // Verificar año válido (24-35)
    if (year < 24 || year > 35) {
      console.log(year, 'año dentro')
      return { invalidExpirationDate: true }; // Año inválido
    }
    return null;
  };
}
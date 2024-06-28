import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingService } from '../../services/booking.service';
import { Reservation } from '../housing-visualizer/housing-reservation/housing-reservation.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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

  public indice: number = -1

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

  public paymentMethodForm: FormGroup = new FormGroup({
    cardNumber: new FormControl('', [Validators.required]),
    expDate: new FormControl('', [Validators.required]),
    cvv: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(4)])
  })

  public type: string = '';
  public reservation!: Reservation
  public houseInfo!: string[]
  public invalidDates!: Date[]
  public rating: string = ''
  public numberReviews: number = -1

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
    console.log(reviews)
    this.rating = reviews.rating
    this.numberReviews = reviews.numberReviews
  }
  public getInvalidDates(){
    this.invalidDates = this.bookingService.getInvalidDates()
  }

  public onStartDateSelected(date: any) {
    this.reservation.startDate = date;
    if(!this.reservation.endDate){
      for (let i = 0; i < 3; i++){
        this.reservation.partialPrices[i].price = 0
      }
      this.reservation.totalPrice = 0
    }
  }

  public onEndDateSelected(date: any) {
    this.reservation.endDate = date;
  }

  public onNightsSelected(nights: any) {
    this.reservation.nights = nights;
    console.log(this.reservation.nights)
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
    this.bookingService.booking().subscribe(result =>{
      if (result && result.success) {
        alert('Se ha registrado la reserva');
        this.router.navigateByUrl('home-stay-list')
      } else {
        alert(result.message);
      }
    })
  }

  public back(){
    console.log(this.reservation.houseId)
    this.router.navigateByUrl(`housing-visualizer/${this.reservation.houseId}`)
  }
}


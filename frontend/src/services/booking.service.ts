import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Guests, Reservation } from '../components/housing-visualizer/housing-reservation/housing-reservation.component';
import { BehaviorSubject, catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingService{

  constructor(
    private http: HttpClient,
  ) { }


  private url = 'http://localhost:3000/stays/solicit'

  public reservation!: Reservation;
  public houseName: string = '';
  public houseType: string = '';
  public id: number = -1;
  public invalidDates: Date[] = [];
  public rating: string = '';
  public numberReviews: number = -1;
  public houseImg: string = '';
  public maxGuests!: Guests

  public rangeDates: BehaviorSubject<Date[]> = new BehaviorSubject<Date[]>([]);
  rangeDates$ = this.rangeDates.asObservable();

  public changeRangeDates(dates: Date[]){
    this.rangeDates.next(dates)
  }

  public addReservation(reservation:Reservation){
    this.reservation = reservation;
  }

  public addHouseInfo(name: string, type:string, img: string, guests: Guests){
    this.houseName = name;
    this.houseType = type;
    this.houseImg = img;
    this.maxGuests = guests;
  }

  public addInvalidDates(dates: Date[]){
    this.invalidDates = dates
  }

  public addReviews(rating: string, numberReviews:number){
    this.rating = rating
    this.numberReviews = numberReviews
  }

  public clearSelection(){
    this.rangeDates.next([])
  }

  public getReservation(): Observable<Reservation>{
    return of(this.reservation)
  }

  public getHouseInfo(): Observable<any[]>{
    return of([this.houseName, this.houseType, this.houseImg, this.maxGuests])
  }

  public getInvalidDates(){
    return this.invalidDates
  }

  public getReviews(){
    return {rating: this.rating, numberReviews: this.numberReviews}
  }

  public addCard(card: any){
    card = {...card, propietarioId: this.reservation.id}
    console.log(card)
  }

  public booking(): Observable<any>{
    const booking = {
      fechaIni: this.reservation.startDate,
      fechaFin: this.reservation.endDate,
      nochesDeEstadia: this.reservation.nights,
      costoNoche: this.reservation.pricePerNight,
      nroAdultos: this.reservation.guests.adults,
      nroNinos: this.reservation.guests.children,
      nroBebes: this.reservation.guests.infants,
      nroMascotas: this.reservation.guests.pets,
      costoHospedaje: this.reservation.partialPrices[0].price,
      tarifaServicio: Math.round(this.reservation.partialPrices[2].price),
      tarifaLimpieza: this.reservation.partialPrices[1].price,
      metodoDePagoId: 1, //cambiar cuando se puedan registar tarjetas, this.reservation.paymentMethodId
      usuarioPagadorId: this.reservation.id,
      huespedId: this.reservation.id,
      propiedadId: this.reservation.houseId,
    }
    return this.http.post<any>(this.url, booking, {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      }
    }).pipe(
      map((result) => {
        if (result) {
          return { success: true };
        }
        return { success: false };
      }),
      catchError((error) => {
        console.error('Error durante la reserva', error);
        let errorMessage = '';
        if (error.error && error.error.message) {
          errorMessage = error.error.message;
        }
        return of({ success: false, message: errorMessage });
      }),
    );
  }

}
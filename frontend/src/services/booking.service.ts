import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Reservation } from '../components/housing-visualizer/housing-reservation/housing-reservation.component';
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

  public startDate: BehaviorSubject<Date | null> = new BehaviorSubject<Date|null>(null);
  public endDate: BehaviorSubject<Date | null> = new BehaviorSubject<Date|null>(null);
  startDate$ = this.startDate.asObservable();
  endDate$ = this.endDate.asObservable();


  public addReservation(reservation:Reservation){
    this.reservation = reservation;
  }

  public addHouseInfo(name: string, type:string){
    this.houseName = name
    this.houseType = type
  }

  public addStartDate(date: Date){    
    this.startDate.next(date)
  }

  public addInvalidDates(dates: Date[]){
    this.invalidDates = dates
  }

  public addReviews(rating: string, numberReviews:number){
    this.rating = rating
    this.numberReviews = numberReviews
  }

  public addEndDate(date: Date |null){    
    this.endDate.next(date)
  }

  public clearSelection(){
    this.startDate.next(null);
    this.endDate.next(null);
  }

  public getReservation(): Observable<Reservation>{
    return of(this.reservation)
  }

  public getHouseInfo(): Observable<string[]>{
    return of([this.houseName, this.houseType])
  }

  public getInvalidDates(){
    return this.invalidDates
  }

  public getReviews(){
    return {rating: this.rating, numberReviews: this.numberReviews}
  }

  public booking(): Observable<any>{
    const booking = {
      fechaIni: this.reservation.startDate,
      fechaFin: this.reservation.endDate,
      huespedId: this.reservation.id,
      propiedadId: this.reservation.houseId
    }
    console.log(booking)
    return this.http.post<any>(this.url, booking).pipe(
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
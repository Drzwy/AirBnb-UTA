import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Reservation } from '../components/housing-visualizer/housing-reservation/housing-reservation.component';
import { catchError, map, Observable, of } from 'rxjs';

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

  public addReservation(reservation:Reservation){
    this.reservation = reservation;
  }

  public addHouseInfo(name: string, type:string){
    this.houseName = name
    this.houseType = type
  }

  public getReservation(): Observable<Reservation>{
    return of(this.reservation)
  }

  public getHouseInfo(): Observable<string[]>{
    return of([this.houseName, this.houseType])
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
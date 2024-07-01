import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentMethodService {

private url: string = 'http://localhost:3000/payment-methods'

constructor(
  private http: HttpClient
) { }

public addPaymentMethod(cardInfo: string):Observable<any>{
  const paymentMethod = {
    infoTarjeta: cardInfo
  };
  return this.http.post<any>(`${this.url}/me`, paymentMethod, {
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${sessionStorage.getItem('token')}`,
    }
  }).pipe(
    map((result) => {
      console.log(result)
      if (result) {
        return { success: true };
      }
      return { success: false };
    }),
    catchError((error) => {
      console.error('Error al agregar el metodo de pago', error);
      console.log(error)
      let errorMessage = '';
      if (error.error && error.error.message) {
        errorMessage = error.error.message;
      }
      return of({ success: false, message: errorMessage });
    }),
  );
}

public getPaymentMethodOfUser(): Observable<any>{
  return this.http.get<any>(`${this.url}/me`,{
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${sessionStorage.getItem('token')}`,
    },
  });
}

}
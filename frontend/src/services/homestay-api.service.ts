import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {HomeStayForm} from "../components/add-home-stay/add-home-stay.component";
import {catchError, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HomestayApiService {
  private url : string = ""

  constructor(private http: HttpClient) {

  }



  public sendHomeStayForm(form: HomeStayForm) {
    const homeStayPost  = {
      dormitorios : form.rooms,
      camas: form.beds,
      banos: form.bathrooms,
      fechasDisponibles: [form.initDate,form.finishDate],
      precioNoche: 10000, // TODO CAMBIAR LUEGO
      tipo: form.type,
      descripcion: form.desc,
      pais: form.location.split(" ")[0],
      ciudad: form.location,
      calle: form.street,
      nroCasa: form.streetNumber,
      nroDpto: form.depNumber,
      comodidades: [form.services],
      opcionesDeSguridad: [form.securityOptions],
      opcionesDeLlegada: [form.arrivalOptions],
      reglas: [form.rules],
      anfitrionId: 1


    }

    return this.http.post(
      this.url,
      homeStayPost
    ).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {

      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }


}



import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {HomeStayForm} from "../components/add-home-stay/add-home-stay.component";
import {catchError, Observable, of, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HomestayApiService {
  private url : string = "http://localhost:3000/homestay";
  private getUrl: string = "http://localhost:3000/homestay";
  private putUrl: string = "http://localhost:3000/homestay";
  private deleteUrl: string = "http://localhost:3000/homestay"

  constructor(private http: HttpClient) {

  }

  public getHomeStayOf(id: number): Observable<any> {
    return this.http.get<HomeStayGetResponse[]>(
      this.getUrl
    )
  }

  public deleteHomeStay(id: number) {
    const url = this.putUrl+"/"+id.toString()
    return this.http.delete(
      `${this.deleteUrl}/${id}`
    )
  }


  public sendHomeStayForm(form: HomeStayForm): Observable<HomeStayCreateDTOResponse> {
    if (!form.rooms || !form.beds || !form.bathrooms || !form.type || !form.desc || !form.street || !form.streetNumber || !form.depNumber || !form.services || !form.securityOptions || !form.arrivalOptions || !form.rules || !form.location || !form.initDate || !form.finishDate) {
      console.error('Formulario incompleto:', form);
      return throwError(() => new Error('Formulario incompleto. Por favor, completa todos los campos.'));
    }
    const request: HomeStayCreateDTOResponse = {
      dormitorios : form.rooms,
      camas: form.beds,
      banos: form.bathrooms,
      precioNoche: 110000, // TODO CAMBIAR LUEGO
      tipo: form.type,
      descripcion: form.desc,
      calle: form.street,
      nroCasa: form.streetNumber,
      nroDpto: form.depNumber,
      comodidades: [form.services],
      opcionesDeSeguridad: [form.securityOptions],
      opcionesDeLlegada: [form.arrivalOptions],
      reglas: [form.rules],
      anfitrionId: 1,
      pais: form.location,
      ciudad: form.location,
      fechasDisponibles: [form.initDate,form.finishDate]
    }
    return this.http.post<HomeStayCreateDTOResponse>(
      this.url,
      request
    ).pipe(
      catchError((error: HttpErrorResponse) => this.handleError(error))
    )
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred :', error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

}

interface HomeStayCreateDTOResponse {
  dormitorios : number,
  camas: number,
  banos: number,
  precioNoche: number, // TODO CAMBIAR LUEGO
  tipo: string,
  descripcion: string,
  calle: string,
  nroCasa: number,
  nroDpto: number,
  comodidades: string[],
  opcionesDeSeguridad: string[],
  opcionesDeLlegada: string[],
  reglas: string[],
  anfitrionId: number,
  pais: string,
  ciudad: string,
  fechasDisponibles: Date[]

}

export interface HomeStayGetResponse  extends  HomeStayCreateDTOResponse {
  id: number,
  fechaDeCreacion: string,
  fechaActualizacion: string,
  estaActivo: boolean,

}






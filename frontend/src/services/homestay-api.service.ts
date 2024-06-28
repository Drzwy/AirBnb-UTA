import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HomeStayForm } from '../components/add-home-stay/add-home-stay.component';
import { catchError, map, Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HomestayApiService {
  private postUrl: string = 'http://localhost:3000/homestays/create';
  private getOfUrl: string = 'http://localhost:3000/homestays/get';
  private putUrl: string = 'http://localhost:3000/homestay';
  private deleteUrl: string = 'http://localhost:3000/homestays/delete';
  private getHomeStays: string =
    'http://localhost:3000/homestays/get/userHouses';
  constructor(private http: HttpClient) {}

  public deleteHomeStay(id: number) {
    return this.http.delete(`${this.deleteUrl}/${id}`);
  }

  public getHomestaysOfUser(id: number): Observable<HomeStayGetResponse[]> {
    const url = this.getHomeStays.concat('/', id.toString());
    return this.http.get<HomeStayGetResponse[]>(url);
  }

  public sendHomeStayForm(form: HomeStayForm) {
    const request: HomeStayCreateDTOResponse = {
      // agregar titulo
      maxPersonas: form.adults, // cambiar por tipo de huesped especifico
      dormitorios: form.rooms,
      camas: form.beds,
      banos: form.bathrooms,
      precioNoche: form.pricePerNight,
      tipo: form.type,
      descripcion: form.desc,
      calle: form.street,
      nroCasa: form.streetNumber,
      nroDpto: form.depNumber,
      comodidades: form.services.split(',').map((service) => service.trim()),
      opcionesDeSeguridad: form.securityOptions
        .split(',')
        .map((option) => option.trim()),
      opcionesDeLlegada: form.arrivalOptions
        .split(',')
        .map((option) => option.trim()),
      reglas: form.rules.split(',').map((rule) => rule.trim()),
      anfitrionId: form.userId,
      pais: form.country,
      ciudad: form.city,
      fechasDisponibles: form.noAvailableDates, //cambiar a fechas no disponibles
      fotos: form.images.split(',').map((img) => img.trim()),
    };
    return this.http
      .post<HomeStayCreateDTOResponse>(this.postUrl, request)
      .pipe(
        map((result) => {
          if (result) {
            return { success: true };
          }
          return { success: false, message: 'Unknown error' };
        }),
        catchError((error) => {
          console.error('Error during registration', error);
          let errorMessage = 'An unknown error occurred';
          if (error.error && error.error.message) {
            errorMessage = error.error.message;
          }
          return of({ success: false, message: errorMessage });
        }),
      );
  }
}

export interface HomeStayCreateDTOResponse {
  dormitorios: number;
  camas: number;
  banos: number;
  precioNoche: number; // TODO CAMBIAR LUEGO
  maxPersonas: number;
  tipo: string;
  descripcion: string;
  calle: string;
  nroCasa: number;
  nroDpto: number;
  comodidades: string[];
  opcionesDeSeguridad: string[];
  opcionesDeLlegada: string[];
  reglas: string[];
  anfitrionId: number;
  pais: string;
  ciudad: string;
  fechasDisponibles: Date[];
  fotos: string[];
}

export interface HomeStayGetResponse extends HomeStayCreateDTOResponse {
  id: number;
  fechaDeCreacion: string;
  fechaActualizacion: string;
  estaActivo: boolean;
}

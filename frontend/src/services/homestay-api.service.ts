import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HomeStayForm } from '../components/add-home-stay/add-home-stay.component';
import { catchError, map, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HomestayApiService {
  private postUrl: string = 'http://localhost:3000/homestays/create';
  private getOfUrl: string = 'http://localhost:3000/homestays/get';
  private putUrl: string = 'http://localhost:3000/homestay';
  private deleteUrl: string = 'http://localhost:3000/homestays/delete';
  constructor(private http: HttpClient) {}

  public deleteHomeStay(id: number) {
    return this.http.delete(`${this.deleteUrl}/${id}`);
  }

  public sendHomeStayForm(form: HomeStayForm) {
    
    const request: HomeStayCreateDTOResponse = {
      dormitorios: form.rooms,
      camas: form.beds,
      banos: form.bathrooms,
      fechasOcupadas: form.noAvailableDates, //cambiar a fechas no disponibles
      precioNoche: form.pricePerNight,
      maxAdultos: form.adults,
      maxNinos: form.children,
      maxBebes: form.babies, 
      maxMascotas: form.pets, 
      tipo: form.type,
      titulo: form.title,
      descripcion: form.desc,
      calle: form.street,
      nroCasa: form.streetNumber,
      nroDpto: form.depNumber,
      comodidades: form.services.split(',').map(service => service.trim()),
      opcionesDeSeguridad: form.securityOptions.split(',').map(option => option.trim()),
      opcionesDeLlegada: form.arrivalOptions.split(',').map(option => option.trim()),
      reglas: form.rules.split(',').map(rule => rule.trim()),
      anfitrionId: form.userId,
      pais: form.country,
      ciudad: form.city,
      fotos: form.images.split(',').map(img => img.trim())
    };
    return this.http
      .post<HomeStayCreateDTOResponse>(this.postUrl, request).pipe(
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
  fechasOcupadas: Date[];
  precioNoche: number; // TODO CAMBIAR LUEGO
  maxAdultos: number;
  maxNinos: number;
  maxBebes: number;
  maxMascotas: number;
  tipo: string;
  titulo: string;
  descripcion: string;
  pais: string;
  ciudad: string;
  calle: string;
  nroCasa: number;
  nroDpto: number;
  comodidades: string[];
  opcionesDeSeguridad: string[];
  opcionesDeLlegada: string[];
  reglas: string[];
  fotos: string[];
  anfitrionId: number;
}

export interface HomeStayGetResponse extends HomeStayCreateDTOResponse {
  id: number;
  fechaDeCreacion: string;
  fechaActualizacion: string;
  estaActivo: boolean;
}
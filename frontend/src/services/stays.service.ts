import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HomeStayGetResponse } from './homestay-api.service';
import { UserMeResponse } from './user-global-preferences.service';

@Injectable({
  providedIn: 'root',
})
export class StaysService {
  private URL: string = 'http://localhost:3000/stays/';
  constructor(private http: HttpClient) {}

  public getStayRequestsMadeByLoggedGuest(): Observable<StayResponse[]> {
    return this.http.get<StayResponse[]>(
      'http://localhost:3000/stays/guest/me',
      {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
      },
    );
  }
  public getStayRequestOfLoggedHost(): Observable<StayOfHost[]> {
    const url = this.URL.concat('host/me');
    return this.http.get<StayOfHost[]>(url, {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
    });
  }

  public acceptStayRequest(stay: StayPost): Observable<StayResponse> {
    const url = this.URL.concat('accept/');

    return this.http.post<StayResponse>(url, stay, {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
    });
  }

  public rejectStayRequest(stay: StayPost): Observable<StayResponse> {
    const url = this.URL.concat('reject/');

    return this.http.post<StayResponse>(url, stay, {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
    });
  }

  public getStayRequestsMadeBy(huespedId: number): Observable<StayResponse[]> {
    const url = this.URL.concat('/guest/', huespedId.toString());
    return this.http.get<StayResponse[]>(url, {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
    });
  }
}

export interface StayResponse {
  id: number;
  huespedId: number;
  propiedadId: number;
  fechaCreacion: string;
  estaActivo: boolean;
  costoHospedaje: number;
  costoNoche: number;
  tarifaServicio: number;
  tarifaLimpieza: number;
  estadoAceptacion: string;
  nroAdultos: number;
  nroNinos: number;
  nroBebes: number;
  nroMascotas: number;
  fechaIni: Date;
  fechaFin: Date;
  Propiedad: HomeStayGetResponse;
  nochesDeEstadia:number;
}

export interface StayPost {
  id: number;
  huespedId: number;
  propiedadId: number;
}

export interface StayOfHost {
  propiedad: HomeStayGetResponse;
  hospedajes: { hospedaje: StayResponse; huesped: UserMeResponse }[];
}

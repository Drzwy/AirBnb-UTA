import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HomeStayGetResponse } from './homestay-api.service';

const availableChangeOptions: ChangeOptionDTO[] = [
  {
    name: 'Peso Chileno',
    abbreviation: 'CLP',
    symbol: '$',
  },
  {
    name: 'Peso Mexicano',
    abbreviation: 'MXN',
    symbol: '$',
  },
  {
    name: 'Dólar Estadounidense',
    abbreviation: 'USD',
    symbol: '$',
  },
  {
    name: 'Dólar de HongKong',
    abbreviation: 'HKN',
    symbol: '$',
  },
];

@Injectable({
  providedIn: 'root',
})
export class UserGlobalPreferencesService {
  private _getCurrentUserURL: string = 'http://localhost:3000/users/me';

  constructor(private http: HttpClient) {}

  public getAllLanguages(): ChangeOptionDTO[] {
    return availableChangeOptions;
  }

  public getCurrentUser(): Observable<UserMeResponse> {
    return this.http.get<UserMeResponse>(this._getCurrentUserURL, {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
    });
  }
}

export interface ChangeOptionDTO {
  name: string;
  symbol: string;
  abbreviation: string;
}

export interface UserMeResponse {
  id: number;
  nombre: string;
  anfitrionDe: HomeStayGetResponse[];
  valoracionesRecibidas?: ValoracionUsuarioResponse[];
}
export interface ValoracionUsuarioResponse {
  puntuacion: number;
}

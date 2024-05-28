import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

const defaultChangeOption: ChangeOptionDTO = {
  name: 'Peso Chileno',
  symbol: '$',
  abbreviation: 'CLP',
};
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
  private _currentChangeOption: ChangeOptionDTO = defaultChangeOption;
  private _getCurrentUserURL: string = 'http://localhost:3000/users/me';
  private _currentToken: string | null = sessionStorage.getItem('token');

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
  public getCurrentToken(): Observable<string> {
    return of(this._currentToken!);
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
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StaysService {
  constructor(private http: HttpClient) {}

  public getStayRequests(): Observable<StayResponse[]> {
    return this.http.get<StayResponse[]>('http://localhost:3000/stays/all', {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
    });
  }

  public getStayRequestsOf(huespedId: number): Observable<StayResponse[]> {
    return this.http.get<StayResponse[]>(
      `http://localhost:3000/stays/guest/${huespedId}`,
    );
  }
}

export interface StayResponse {
  id: number;
  huespedId: number;
  propiedadId: number;
}

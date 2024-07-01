import { Injectable } from '@angular/core';
import { UserMeResponse } from './user-global-preferences.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessageApiService {
  private readonly urlGet: string = '';

  constructor(private _http: HttpClient) {}
  public getMessagesOfId(id: number): Observable<MessageResponse[]> {
    return this._http.get<MessageResponse[]>(`URL/${id}`);
  }
}
export interface MessageResponse {
  msgDe: UserMeResponse;
  msgPara: UserMeResponse;
  msgTexto: string;
}

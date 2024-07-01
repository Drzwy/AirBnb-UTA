import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { UserGlobalPreferencesService } from './user-global-preferences.service';
import { UserMeResponse } from './user-global-preferences.service';

describe('UserGlobalPreferencesService', () => {
  let service: UserGlobalPreferencesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserGlobalPreferencesService],
    });
    service = TestBed.inject(UserGlobalPreferencesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should obtain the currently user', () => {
    const testUserResponse: UserMeResponse = {
      id: 2,
      nombre: 'Ibar Ossandon Urrutia',
      anfitrionDe: [],
      apellidoPat: 'Ossandon'
    };
    //Se asegura que el backend responda al mismo usuario que se espera
    service.getCurrentUser().subscribe((response) => {
      expect(response).toEqual(testUserResponse);
    });

    //Se comprueba que la petición enviada es de tipo GET y coincide el header de JWT
    const req = httpMock.expectOne(service['_getCurrentUserURL']);
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe(
      `Bearer ${sessionStorage.getItem('token')}`,
    );

    req.flush(testUserResponse);
  });
});

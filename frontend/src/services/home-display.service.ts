import { Injectable } from '@angular/core';
import { ImageDTO } from '../components/housing-visualizer/images-card/image-card.component';
import { HomeStayInformation } from '../components/home-stay-list/home-stay-list.component';
import { BehaviorSubject, Observable } from 'rxjs';
import { FilterState } from '../components/home-stay-list/advanced-filter/advanced-filter.component';
import { HttpClient } from '@angular/common/http';

export const emptyFilter: FilterState = {
  numberOfRooms: 0,
  numberOfBathrooms: 0,
  numberOfBeds: 0,
  minPricePerNight: 0,
  maxPricePerNight: 0,
  type: ''
};

@Injectable({
  providedIn: 'root',
})
export class HomeDisplayService {
  private urlHomeStays: string = 'http://localhost:3000/homestays/get';
  private urlFilter: string = 'http://localhost:3000/homestays/filter'
  private urlReviews: string = 'http://localhost:3000/reviews/homestays'
  private urlUser: string = 'http://localhost:3000/users'

  constructor(private http: HttpClient) {}

  readonly HOUSE_TYPE_VECTOR_SIZE: number = 30;

  public availableHomeStays2: BehaviorSubject<HomeStayInformation[]> = new BehaviorSubject<HomeStayInformation[]>([]);
  availableHomeStays2$ = this.availableHomeStays2.asObservable();

  public filterHomestays(filter: any){ //any por ahora
    this.http.get<HomeStayInformation[]>(`${this.urlFilter}?${filter}`).subscribe(result =>{
      this.availableHomeStays2.next(result)
    })
  }

  public getHome(){
    this.http.get<HomeStayInformation[]>(this.urlHomeStays).subscribe(result =>{
      this.availableHomeStays2.next(result)
    })
  }

  public getHomeStaysReviews(): Observable<reviews[]>{
    return this.http.get<reviews[]>(`${this.urlReviews}`,{
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
    })
  }

  public getReviewsByID(id: number): Observable<reviews[]>{
    return this.http.get<reviews[]>(`${this.urlReviews}/${id}`)
  }

  public getHomeStay(id: number) {
    return this.http.get<HomeStayInformation>(`${this.urlHomeStays}/${id}`,{
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
    });
  }

  public getUserById(id:number) {
    return this.http.get<any>(`${this.urlUser}/${id}`,{
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
    });
  }
  
  /*
   * Va a cambiar cuando se pueda llamar a la BBDD y obtener los tipos disponibles
   * */
  public getHomeStayTypes(): HomeStayType[] {
    return [
      {
        type: 'Cabaña',
        vectorImage: {
          url: 'https://a0.muscache.com/pictures/732edad8-3ae0-49a8-a451-29a8010dcc0c.jpg',
          alt: '',
          height: 20,
          width: 20,
        },
      },
      {
        type: 'Casa Chica',
        vectorImage: {
          url: 'https://a0.muscache.com/pictures/3271df99-f071-4ecf-9128-eb2d2b1f50f0.jpg',
          alt: '',
          height: 20,
          width: 20,
        },
      },
      {
        type: 'Casa Grande',
        vectorImage: {
          url: 'https://a0.muscache.com/pictures/78ba8486-6ba6-4a43-a56d-f556189193da.jpg',
          alt: '',
          height: 20,
          width: 20,
        },
      },
      {
        type: 'Ruca',
        vectorImage: {
          url: 'https://a0.muscache.com/pictures/1d477273-96d6-4819-9bda-9085f809dad3.jpg',
          alt: '',
          height: 20,
          width: 20,
        },
      },
      {
        type: 'Apartamento Pequeño',
        vectorImage: {
          url: 'https://a0.muscache.com/pictures/251c0635-cc91-4ef7-bb13-1084d5229446.jpg',
          alt: '',
          height: 20,
          width: 20,
        },
      },
    ];
  }

}

/*
 * Cada tipo de arriendo tiene un nombre y un icono/imagen predeterminado
 * Debe almacenarse en la BBDD, de lo contrario, crear un archivo assets
 * */
export interface HomeStayType {
  type: string;
  vectorImage: ImageDTO;
}

export interface reviews {
  fechaCreacion: Date;
  estaActivo: boolean;
  descripcion: string;
  puntuacion: number;
  usuarioCreadorId: number;
  propiedadCriticadaId: number;
}

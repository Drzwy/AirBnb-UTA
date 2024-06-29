import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  emptyFilter,
  HomeDisplayService,
  HomeStayType,
  reviews,
} from '../../services/home-display.service';
import { FilterState } from './advanced-filter/advanced-filter.component';
import { Router } from '@angular/router';
import { forkJoin, map, Subscription, switchMap } from 'rxjs';
import { ImageDTO } from '../housing-visualizer/images-card/image-card.component';

@Component({
  selector: 'app-home-stay-list',
  templateUrl: './home-stay-list.component.html',
  styleUrl: './home-stay-list.component.css',
})
export class HomeStayListComponent implements OnInit, OnDestroy {

  public images!: ImageDTO[][]

  public currentType: string = '';
  public currentFilter: FilterState = emptyFilter;
  public currentHomeStayList: HomeStayInformation[] = [];
  public rating:{ stayId: number, averageScore: number }[] = [];

  private _homestayTypeSubscription?: Subscription;
  private _currentFilterSubscription?: Subscription;
  private _filterByConditionSubscription?: Subscription;

  constructor(
    private service: HomeDisplayService,
    private router: Router,
  ) {}
  ngOnInit() {
    this._homestayTypeSubscription = this.service.currentType.subscribe(
      (value) => {
        this.updateHomeStayList(value);
      },
    );
    this._currentFilterSubscription = this.service.currentFilterState.subscribe(
      (value) => (this.currentFilter = value),
    );
    this._filterByConditionSubscription = this.service
      .filterHomeStaysByConditions()
      .subscribe((value) => (this.currentHomeStayList = value));
  }
  ngOnDestroy() {
    this._currentFilterSubscription!.unsubscribe();
    this._filterByConditionSubscription!.unsubscribe();
    this._homestayTypeSubscription!.unsubscribe();
  }

  readonly CONSTANTS = {
    perNightText: 'noche',
  };
  readonly homeStayTypes: HomeStayType[] = this.service.getHomeStayTypes();
  readonly IMAGE_DIMENSIONS: number = 300;

  public homeVisualizer(id: number) {
    this.router.navigate([`housing-visualizer/${id}`]);
  }

  updateHomeStayList(type?: string, filter?: FilterState) {
    this.service.getAvailableHomeStay().pipe(
      switchMap((result: any[]) => {
        if (type === undefined || type === '') {
          this.currentHomeStayList = result;
        } else {
          this.currentHomeStayList = result.filter(
            (homeStay) => homeStay.tipo == type && homeStay.precioNoche
          );
        }
        // Realizar las llamadas a las reseñas después de actualizar currentHomeStayList
        const reviewRequests = this.currentHomeStayList.map(homeStay =>
          this.service.getReviewsByID(homeStay.id).pipe(
            map(reviews => ({
              stayId: homeStay.id,
              averageScore: this.calculateAverageScore(reviews)
            }))
          )
        );

        return forkJoin(reviewRequests);
      })
    ).subscribe((results: any) => {
      this.rating = results;
    });
  }

  calculateAverageScore(reviews: reviews[]): number {
    if (reviews.length === 0) return 0;
    const totalScore = reviews.reduce((sum, review) => sum + review.puntuacion, 0);
    return parseFloat((totalScore / reviews.length).toFixed(1));
  }

  getRating(id:number): number{
    const rate = this.rating.find(house => house.stayId === id)
    return rate!.averageScore
    
  }

}

export interface HomeStayInformation {
  id: number,
  fechaCreacion: Date,
  fechaActualizacion: Date,
  estaActivo: boolean,
  dormitorios: number,
  camas: number,
  banos: number,
  fechasDisponibles: Date[],
  precioNoche: number,
  maxPersonas: number,  
  tipo: string,
  descripcion: string,
  pais: string,
  ciudad: string,
  calle: string,
  nroCasa: number,
  nroDpto: number,
  comodidades: string[],
  opcionesDeSeguridad: string[],
  opcionesDeLlegada: string[],
  reglas: string[],
  anfitrionId: number,
  fotos: string[]
}

interface PricePerNight {
  price: number;
  typeChange?: String;
}

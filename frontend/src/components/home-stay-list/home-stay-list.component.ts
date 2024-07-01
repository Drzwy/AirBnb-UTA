import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  emptyFilter,
  HomeDisplayService,
  HomeStayType,
  reviews,
} from '../../services/home-display.service';
import { FilterState } from './advanced-filter/advanced-filter.component';
import { Router } from '@angular/router';
import { forkJoin, map, max, Subscription, switchMap } from 'rxjs';
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

  private homeStaysSubscription?: Subscription;
  public homestays:HomeStayInformation[] = []

  constructor(
    private service: HomeDisplayService,
    private router: Router,
  ) {}
  ngOnInit() {

    this.getHome()
    this.homeStaysSubscription = this.service.availableHomeStays2$.pipe(
      switchMap((result: any[]) => {
        this.homestays = result

        const reviewRequests = this.homestays.map(homeStay =>
          this.service.getReviewsByID(homeStay.id).pipe(
            map(reviews =>({
              stayId:homeStay.id,
              averageScore:this.calculateAverageScore(reviews)
            }))
          )
        );
        return forkJoin(reviewRequests)
      })
    ).subscribe((results: any) => {
      this.rating = results
      console.log(results)
    })

  }
  ngOnDestroy() {
    this.homeStaysSubscription!.unsubscribe();
  }

  readonly CONSTANTS = {
    perNightText: 'noche',
  };
  readonly homeStayTypes: HomeStayType[] = this.service.getHomeStayTypes();
  readonly IMAGE_DIMENSIONS: number = 300;

  public getHome(){
    this.service.getHome()
  }

  public homeVisualizer(id: number) {
    this.router.navigate([`housing-visualizer/${id}`]);
  }

  public calculateAverageScore(reviews: reviews[]): number {
    if (reviews.length === 0) return 0;
    const totalScore = reviews.reduce((sum, review) => sum + review.puntuacion, 0);
    return parseFloat((totalScore / reviews.length).toFixed(1));
  }

  public getRating(id:number): number{
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
  fechasOcupadas: Date[],
  precioNoche: number,
  maxAdultos: number,  
  maxNinos: number,
  maxBebes: number,
  maxMascotas: number,
  tipo: string,
  titulo: string,
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

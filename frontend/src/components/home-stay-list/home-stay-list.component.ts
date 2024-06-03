import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  emptyFilter,
  HomeDisplayService,
  HomeStayType,
} from '../../services/home-display.service';
import { FilterState } from './advanced-filter/advanced-filter.component';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
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

  public updateHomeStayList(type?: string, filter?: FilterState,) {
    this.service.getAvailableHomeStay().subscribe((result) =>{
      if (type === undefined || type == '') {
        this.currentHomeStayList = result;
        this.images = this.service.images
      } else {
        this.currentHomeStayList = result.filter(
          (homeStay) => homeStay.tipo == type && homeStay.precioNoche,
        );
      } 
    })  
  }

  // public getPriceOf(home: HomeStayInformation): String {
  //   return this.service.intToMoneyFormat(
  //     home.pricePerNight.price,
  //     home.pricePerNight.typeChange,
  //   );
  // }
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

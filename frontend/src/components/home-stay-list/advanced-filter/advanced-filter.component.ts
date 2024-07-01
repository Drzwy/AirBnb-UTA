import { Component, OnInit } from '@angular/core';
import { HomeDisplayService, HomeStayType } from '../../../services/home-display.service';

@Component({
  selector: 'app-advanced-filter',
  templateUrl: './advanced-filter.component.html',
  styleUrl: './advanced-filter.component.css',
})
export class AdvancedFilterComponent implements OnInit {
  public showFilterDiv: boolean = false;
  public filterButtonText: string;

  public _filterIsValid: boolean = false;

  public currentMinPricePerNight: number;
  public currentMaxPricePerNight: number;
  public currentNumberOfRooms: number;
  public currentNumberOfBathrooms: number;
  public currentNumberOfBeds: number;
  public currentType: string;


  public rangePrice: number[] = [15000, 86000];
  public numbers: number[] = [1,2,3,4,5,6,7,8]

  ngOnInit() {
  }

  private _getFilterButtonText = (value: boolean) => {
    return value ? this.CONSTANTS.true : this.CONSTANTS.false;
  };

  homeStayTypes: HomeStayType[] = this.service.getHomeStayTypes();

  constructor(private service: HomeDisplayService) {
    this.filterButtonText = this._getFilterButtonText(this.showFilterDiv);
    this.currentMinPricePerNight = -1;
    this.currentMaxPricePerNight = -1;
    this.currentNumberOfRooms = -1;
    this.currentNumberOfBathrooms = -1;
    this.currentNumberOfBeds = -1;
    this.currentType = '';
  }

  public filter() {
    let filter = ''
    filter = `${filter}precioNocheMin=${this.rangePrice[0]}&`
    filter = `${filter}precioNocheMax=${this.rangePrice[1]}&`

    if(this.currentNumberOfRooms != -1){
      filter = `${filter}dormitorios=${this.currentNumberOfRooms}&`
    }
    if(this.currentNumberOfBathrooms != -1){
      filter = `${filter}banos=${this.currentNumberOfBathrooms}&`
    }
    if(this.currentNumberOfBeds != -1){
      filter = `${filter}camas=${this.currentNumberOfBeds}&`
    }
    if(this.currentType != ''){
      filter = `${filter}tipo=${this.currentType}&`
    }
    this.service.filterHomestays(filter)
  }

  public clearAll(){
    this.currentMinPricePerNight = -1;
    this.currentMaxPricePerNight = -1;
    this.currentNumberOfRooms = -1;
    this.currentNumberOfBathrooms = -1;
    this.currentNumberOfBeds = -1;
    this.currentType = '';
    this.service.getHome()
  }

  readonly CONSTANTS = {
    true: 'Mostrar Menos',
    false: 'Mostrar Más',
    valid: 'INPUT VALIDO',
    invalid: 'INPUT INVALIDO',
    applyFilters: 'Aplicar Filtro',
    minPriceLabel: 'Precio Mínimo por Noche',
    maxPriceLabel: 'Precio Máximo por Noche',
    numberOfRoomsLabel: 'Número de Habitaciones',
    numberOfBathroomsLabel: 'Número de Baños',
    numberOfBedsLabel: 'Número de Camas',
  };
}

export interface FilterState {
  minPricePerNight: number;
  maxPricePerNight: number;
  numberOfRooms: number;
  numberOfBathrooms: number;
  numberOfBeds: number;
  type: string;
}

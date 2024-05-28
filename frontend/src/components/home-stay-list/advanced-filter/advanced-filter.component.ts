import { Component, OnInit } from '@angular/core';
import { HomeDisplayService } from '../../../services/home-display.service';

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
  public currentNumberOfGuests: number;
  public currentNumberOfRooms: number;
  public currentNumberOfBathrooms: number;

  ngOnInit() {
    this.service.filterIsValid.subscribe((value) => {
      this._filterIsValid = value;
    });
  }

  private _getFilterButtonText = (value: boolean) => {
    return value ? this.CONSTANTS.true : this.CONSTANTS.false;
  };

  constructor(private service: HomeDisplayService) {
    this.filterButtonText = this._getFilterButtonText(this.showFilterDiv);
    this.currentMinPricePerNight = 0;
    this.currentMaxPricePerNight = 0;
    this.currentNumberOfGuests = 0;
    this.currentNumberOfRooms = 0;
    this.currentNumberOfBathrooms = 0;
  }

  public switchFiltersOption() {
    this.showFilterDiv = !this.showFilterDiv;
    this.filterButtonText = this._getFilterButtonText(this.showFilterDiv);
  }
  public sendCurrentFilterState(): void {
    const filterState: FilterState = {
      minPricePerNight: this.currentMinPricePerNight,
      maxPricePerNight: this.currentMaxPricePerNight,
      numberOfGuests: this.currentNumberOfGuests,
      numberOfRooms: this.currentNumberOfRooms,
      numberOfBathrooms: this.currentNumberOfBathrooms,
    };
    this.service.changeCurrentFilterState(filterState);

    if (this._filterIsValid) {
      this.currentMinPricePerNight = 0;
      this.currentMaxPricePerNight = 0;
      this.currentNumberOfGuests = 0;
      this.currentNumberOfRooms = 0;
      this.currentNumberOfBathrooms = 0;
    }
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
    numberOfGuestsLabel: 'Número de Huéspedes',
  };
}

export interface FilterState {
  minPricePerNight: number;
  maxPricePerNight: number;
  numberOfGuests: number;
  numberOfRooms: number;
  numberOfBathrooms: number;
}

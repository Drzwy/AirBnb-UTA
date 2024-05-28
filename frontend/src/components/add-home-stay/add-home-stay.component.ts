import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  HomeDisplayService,
  HomeStayType,
} from '../../services/home-display.service';
import { HomestayApiService } from '../../services/homestay-api.service';
import {
  UserGlobalPreferencesService,
  UserMeResponse,
} from '../../services/user-global-preferences.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-home-stay',
  templateUrl: './add-home-stay.component.html',
  styleUrl: './add-home-stay.component.css',
})
export class AddHomeStayComponent implements OnInit, OnDestroy {
  private _userSub?: Subscription;
  private _currentUser?: UserMeResponse;

  constructor(
    private serviceForHomeStayTypes: HomeDisplayService,
    private serviceForHttp: HomestayApiService,
    private serviceForUser: UserGlobalPreferencesService,
  ) {}

  ngOnInit() {
    this._userSub = this.serviceForUser.getCurrentUser().subscribe((value) => {
      this._currentUser = value;
    });
  }
  ngOnDestroy(): void {
    this._userSub?.unsubscribe();
  }

  public currentRooms: number = 0;
  public currentBeds: number = 0;
  public currentBathrooms: number = 0;
  public currentType: string = '';
  public currentDesc: string = '';
  public currentPricePerNight: number = 0;
  public currentAvailableDates: Date[] = [];
  public currentInitDate: Date = new Date();
  public currentFinishDate: Date = new Date();
  public currentRules: string = '';
  public currentLocation: string = '';
  public currentStreetAddress: string = '';
  public currentServices: string = '';
  public currentStreetNumber: number = 0;
  public currentDepNumber: number = 0;
  public currentSecurityOptions: string = '';
  public currentArrivalOptions: string = '';

  private invalidFormAlertNotification: boolean = false;
  public getFormIsValid(): boolean {
    return this.invalidFormAlertNotification;
  }

  readonly CONSTANTS = {
    roomsNumberLabel: 'Número de Dormitorios',
    bedsNumberLabel: 'Número de Camas disponible',
    bathsNumberLabel: 'Número de Baños disponible',
    homeStayTypeLabel: 'Tipo de Propiedad',
    descriptionLabel: 'Descripción de la propiedad',
    availableDateLabel: 'Fechas de disponibilidad',
    pricePerNightLabel: 'Precio por Noche',
    rulesLabel: 'Reglas',
    locationLabel: 'Ubicación (Comuna)',
    streetAddressLabel: 'Calle',
    homeStayNumberAddress: 'Número de Casa (opcional)',
    homeStayDeptNumberAddress: 'Número de Departamento (opcional)',
    servicesAvailableLabel: 'Servicios disponibles',
    securityOptionsLabel: 'Opciones de Seguridad',
    arrivalOptionsLabel: 'Opciones de Llegada',
    submitButtonLabel: 'Enviar Formulario',
  };

  public getHomeStayTypes(): HomeStayType[] {
    return this.serviceForHomeStayTypes.getHomeStayTypes();
  }

  public async sendDataToValidation() {
    const form: HomeStayForm = {
      rooms: this.currentRooms,
      beds: this.currentBeds,
      bathrooms: this.currentBathrooms,
      type: this.currentType,
      desc: this.currentDesc,
      pricePerNight: this.currentPricePerNight,
      initDate: this.currentInitDate,
      finishDate: this.currentFinishDate,
      rules: this.currentRules,
      location: this.currentLocation,
      services: this.currentServices,
      street: this.currentStreetAddress,
      streetNumber: this.currentStreetNumber,
      depNumber: this.currentDepNumber,
      securityOptions: this.currentSecurityOptions,
      arrivalOptions: this.currentArrivalOptions,
      userId: this._currentUser!.id,
    };

    if (this.validateForm(form)) {
      this.invalidFormAlertNotification = false;
      this.serviceForHttp.sendHomeStayForm(form).subscribe((form) => {
        this.cleanEntries();
      });
    } else {
      this.invalidFormAlertNotification = true;
      this.cleanEntries();
    }
  }

  private validateForm(form: HomeStayForm): boolean {
    if (form === undefined) return false;
    return (
      form.rooms > 0 ||
      form.bathrooms > 0 ||
      form.beds > 0 ||
      form.initDate.toString() == ''
    );
  }
  private cleanEntries() {
    this.currentRooms = 0;
    this.currentBeds = 0;
    this.currentBathrooms = 0;
    this.currentType = '';
    this.currentDesc = '';
    this.currentPricePerNight = 0;
    this.currentInitDate = new Date();
    this.currentFinishDate = new Date();
    this.currentRules = '';
    this.currentLocation = '';
    this.currentStreetAddress = '';
    this.currentServices = '';
    this.currentStreetNumber = 0;
    this.currentDepNumber = 0;
    this.currentSecurityOptions = '';
    this.currentArrivalOptions = '';
  }

  public currentHomeStayForm?: HomeStayForm;

  protected readonly navigator = navigator;
}

export interface HomeStayForm {
  rooms: number;
  beds: number;
  bathrooms: number;
  type: string;
  desc: string;
  pricePerNight: number;
  initDate: Date;
  finishDate: Date;
  rules: string;
  location: string;
  street: string;
  services: string;
  streetNumber: number;
  depNumber: number;
  securityOptions: string;
  arrivalOptions: string;
  userId: number;
}

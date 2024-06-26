import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  HomeDisplayService,
  HomeStayType,
} from '../../services/home-display.service';
import { HomestayApiService } from '../../services/homestay-api.service';
import { Subscription } from 'rxjs';
import { UserGlobalPreferencesService, UserMeResponse } from '../../services/user-global-preferences.service';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-home-stay',
  templateUrl: './add-home-stay.component.html',
  styleUrl: './add-home-stay.component.css',
})
export class AddHomeStayComponent implements OnInit, OnDestroy{
  private _userSub?: Subscription;
  private _currentUser?: UserMeResponse;
  
  constructor(
    private serviceForHomeStayTypes: HomeDisplayService,
    private serviceForHttp: HomestayApiService,
    private serviceForUser: UserGlobalPreferencesService,
  ) {}

  ngOnInit(): void {
    this.getHomeStayTypes()
    this._userSub = this.serviceForUser.getCurrentUser().subscribe((value) => {
      this._currentUser = value;
    });
  }

  ngOnDestroy(): void {
    this._userSub?.unsubscribe();
  }

  public homeStayForm: FormGroup = new FormGroup({
    guest: new FormControl(1, [Validators.required, Validators.min(1), Validators.max(10)]), //puse maximo 10 pero puede cambiar
    rooms: new FormControl(1, [Validators.required, Validators.min(1), Validators.max(10)]),
    beds: new FormControl(1, [Validators.required, Validators.min(1), Validators.max(10)]),
    bathrooms: new FormControl(1, [Validators.required, Validators.min(1), Validators.max(10)]),
    type: new FormControl('', [Validators.required]),
    desc: new FormControl('', [Validators.required]),
    pricePerNight: new FormControl(10000, [Validators.required, Validators.min(5000)]),
    noAvailableDates: new FormControl([]), //no se si deberia ser required?
    rules: new FormControl('', [Validators.required]),
    title: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    country: new FormControl('', [Validators.required]),
    images: new FormControl('', [Validators.required, imageLinksValidator()]),
    streetAddress: new FormControl('', [Validators.required]),
    services: new FormControl('', [Validators.required]),
    streetNumber: new FormControl(null, [Validators.required]),
    depNumber: new FormControl(null, [Validators.required]),
    securityOptions: new FormControl('', [Validators.required]),
    arrivalOptions: new FormControl('', [Validators.required]),
  })

  public types!: HomeStayType[]

  public currentGuests: number = 1;
  public currentRooms: number = 1;
  public currentBeds: number = 1;
  public currentBathrooms: number = 1;
  public currentType: string = '';
  public currentDesc: string = '';
  public currentPricePerNight: number = 0;
  public noAvailableDates: Date[] = [];
  public currentInitDate: Date = new Date();
  public currentFinishDate: Date = new Date();
  public currentRules: string = '';
  public currentTitle: string = '';
  public currentCity: string = '';
  public currentCountry: string = '';
  public currentImages: string = ''
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
    guestsNumberLabel: 'Número de Huespedes',
    roomsNumberLabel: 'Número de Habitaciones',
    bedsNumberLabel: 'Número de Camas disponible',
    bathsNumberLabel: 'Número de Baños disponible',
    homeStayTypeLabel: 'Tipo de Propiedad',
    descriptionLabel: 'Descripción de la propiedad',
    availableDateLabel: 'Fechas no disponibles (opcional)',
    homeStayTitleLabel: 'Titulo de la propiedad',
    pricePerNightLabel: 'Precio por Noche',
    rulesLabel: 'Reglas',
    cityLabel: 'Ciudad',
    countryLabel: 'Pais',
    imagesLabel: 'Imagenes de la propiedad',
    streetAddressLabel: 'Calle',
    homeStayNumberAddress: 'Número de Casa',
    homeStayDeptNumberAddress: 'Número de Departamento (opcional)',
    servicesAvailableLabel: 'Servicios disponibles',
    securityOptionsLabel: 'Opciones de Seguridad',
    arrivalOptionsLabel: 'Opciones de Llegada',
    submitButtonLabel: 'Enviar Formulario',
  };

  public increment(field: string): void {
    const currentField = this.homeStayForm.get(field)!.value || 0;
    if(field != 'pricePerNight'){
      this.homeStayForm.get(field)!.setValue(currentField + 1);
    } else {
      this.homeStayForm.get(field)!.setValue(currentField + 5000);
    }
    
  }

  public decrement(field: string): void {
    const currentField = this.homeStayForm.get(field)!.value || 0;
    if (currentField > 1) {
      if(field != 'pricePerNight'){
        this.homeStayForm.get(field)!.setValue(currentField - 1);
      } else {
        if((currentField-5000) > 10000) {
          this.homeStayForm.get(field)!.setValue(currentField - 5000);
        } else{
          this.homeStayForm.get(field)!.setValue(10000);
        }
      } 
    }
  }

  public borrar(){
    this.homeStayForm.get('noAvailableDates')?.setValue([]);
  }

  public getHomeStayTypes(){
    this.types = this.serviceForHomeStayTypes.getHomeStayTypes();
  }

  public async sendDataToValidation() {
    const form: HomeStayForm = {
      guests: this.currentGuests,
      rooms: this.currentRooms,
      beds: this.currentBeds,
      bathrooms: this.currentBathrooms,
      pricePerNight: this.currentPricePerNight,
      type: this.currentType,
      desc: this.currentDesc,
      initDate: this.currentInitDate,
      finishDate: this.currentFinishDate,
      title: this.currentTitle,
      rules: this.currentRules,
      country: this.currentCountry,
      city: this.currentCity,
      services: this.currentServices,
      street: this.currentStreetAddress,
      streetNumber: this.currentStreetNumber,
      depNumber: this.currentDepNumber,
      securityOptions: this.currentSecurityOptions,
      arrivalOptions: this.currentArrivalOptions,
      userId: this._currentUser!.id,
      images: this.currentImages
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
      form.guests > 1 ||
      form.rooms > 0 ||
      form.bathrooms > 0 ||
      form.beds > 0 ||
      form.initDate.toString() == ''
    );
  }
  private cleanEntries() {
    this.currentGuests = 0;
    this.currentRooms = 0;
    this.currentBeds = 0;
    this.currentBathrooms = 0;
    this.currentType = '';
    this.currentDesc = '';
    this.currentPricePerNight = 0;
    this.currentInitDate = new Date();
    this.currentFinishDate = new Date();
    this.currentRules = '';
    this.currentTitle = '';
    this.currentCountry = '';
    this.currentCity = '';
    this.currentStreetAddress = '';
    this.currentServices = '';
    this.currentStreetNumber = 0;
    this.currentDepNumber = 0;
    this.currentSecurityOptions = '';
    this.currentArrivalOptions = '';
    this.currentImages = ''
  }

  public currentHomeStayForm?: HomeStayForm;

  protected readonly navigator = navigator;
}

export interface HomeStayForm {
  guests: number;
  rooms: number;
  beds: number;
  bathrooms: number;
  pricePerNight: number;
  type: string;
  desc: string;
  initDate: Date;
  finishDate: Date;
  rules: string;
  title: string;
  country: string;
  city: string;
  street: string;
  services: string;
  streetNumber: number;
  depNumber: number;
  securityOptions: string;
  arrivalOptions: string;
  userId: number;
  images: string; //en servicio hacerlo arreglo para enviar
}

export function imageLinksValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const links = control.value || '';
    const urlPattern = /^(http|https):\/\/[^\s$.?#].[^\s]*$/;
    const imagePattern = /\.(jpeg|jpg|gif|png|webp)$/i;

    if (links.length != 0) {
      for (let link of links.split(',')) {
        link = link.trim();
        if (!urlPattern.test(link) || !imagePattern.test(link)) {
          return { invalidImageLink: true };
        }
      }
    }
    return null;
  };
}
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  HomeDisplayService,
  HomeStayType,
} from '../../services/home-display.service';
import { HomestayApiService } from '../../services/homestay-api.service';
import { Subscription } from 'rxjs';
import { UserGlobalPreferencesService, UserMeResponse } from '../../services/user-global-preferences.service';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
    private router: Router
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

  public minDate = new Date()

  readonly CONSTANTS = {
    adultsNumberLabel: 'Número de Adultos',
    childrenNumberLabel: 'Número de Niños',
    babiesNumberLabel: 'Número de Bebes',
    petsNumberLabel: 'Número de Mascotas',
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

  public homeStayForm: FormGroup = new FormGroup({
    adults: new FormControl(1, [Validators.required, Validators.min(1), Validators.max(10)]), //puse maximo 10 pero puede cambiar
    children: new FormControl(1, [Validators.required, Validators.min(1), Validators.max(10)]),
    babies: new FormControl(1, [Validators.required, Validators.min(1), Validators.max(10)]),
    pets: new FormControl(1, [Validators.required, Validators.min(1), Validators.max(10)]),
    rooms: new FormControl(1, [Validators.required, Validators.min(1), Validators.max(10)]),
    beds: new FormControl(1, [Validators.required, Validators.min(1), Validators.max(10)]),
    bathrooms: new FormControl(1, [Validators.required, Validators.min(1), Validators.max(10)]),
    type: new FormControl('', [Validators.required]),
    desc: new FormControl('', [Validators.required]),
    pricePerNight: new FormControl(10000, [Validators.required, Validators.min(10000)]),
    noAvailableDates: new FormControl([]), //no se si deberia ser required?
    rules: new FormControl('', [Validators.required]),
    title: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    country: new FormControl('', [Validators.required]),
    images: new FormControl('', [Validators.required, imageLinksValidator()]),
    streetAddress: new FormControl('', [Validators.required]),
    services: new FormControl('', [Validators.required]),
    streetNumber: new FormControl(null, [Validators.required]),
    depNumber: new FormControl(''), //segun mi logica no deberia ser obligatorio este
    securityOptions: new FormControl('', [Validators.required]),
    arrivalOptions: new FormControl('', [Validators.required]),
  })

  public types!: HomeStayType[]

  public increment(field: string): void {
    const currentField = this.homeStayForm.get(field)!.value || 0;
    if(field != 'pricePerNight'){
      this.homeStayForm.get(field)!.setValue(currentField + 1);
    } else {
      if((currentField+5000) < 10000){
        this.homeStayForm.get(field)!.setValue(10000);
      }else{
        this.homeStayForm.get(field)!.setValue(currentField + 5000);
      }
      
    }
    this.homeStayForm.get(field)!.updateValueAndValidity()
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

  public sendDataToValidation() {
    const form: HomeStayForm = {
      adults: this.homeStayForm.get('adults')?.value,
      children: this.homeStayForm.get('children')?.value,
      babies: this.homeStayForm.get('babies')?.value,
      pets: this.homeStayForm.get('pets')?.value,
      rooms: this.homeStayForm.get('rooms')?.value,
      beds: this.homeStayForm.get('beds')?.value,
      bathrooms: this.homeStayForm.get('bathrooms')?.value,
      pricePerNight: this.homeStayForm.get('pricePerNight')?.value,
      type: this.homeStayForm.get('type')?.value,
      desc: this.homeStayForm.get('desc')?.value,
      noAvailableDates: this.homeStayForm.get('noAvailableDates')?.value,
      rules: this.homeStayForm.get('rules')?.value,
      title: this.homeStayForm.get('title')?.value,
      country: this.homeStayForm.get('country')?.value,
      city: this.homeStayForm.get('city')?.value,
      street: this.homeStayForm.get('streetAddress')?.value,
      services: this.homeStayForm.get('services')?.value,
      streetNumber: this.homeStayForm.get('streetNumber')?.value,
      depNumber: this.homeStayForm.get('depNumber')?.value,
      securityOptions: this.homeStayForm.get('securityOptions')?.value,
      arrivalOptions: this.homeStayForm.get('arrivalOptions')?.value,
      userId: this._currentUser!.id,
      images: this.homeStayForm.get('images')?.value
    }

    this.serviceForHttp.sendHomeStayForm(form).subscribe((result)=>{
      if(result && result.success){
        alert("Propiedad registrada correctamente")
        this.router.navigateByUrl('home-stay-list')
      } else{
        alert(result.message || "Error al registrar la propiedad")
      }
    })
    
  }

  
  protected readonly navigator = navigator;
}

export interface HomeStayForm {
  adults: number;
  children: number;
  babies: number;
  pets: number;
  rooms: number;
  beds: number;
  bathrooms: number;
  pricePerNight: number;
  type: string;
  desc: string;
  noAvailableDates: Date[];
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
    const imagePattern = /(jpeg|jpg|gif|png|webp|images)/i;

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
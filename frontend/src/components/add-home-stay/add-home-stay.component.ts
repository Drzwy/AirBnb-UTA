import { Component } from '@angular/core';
import {HomeDisplayService, HomeStayType} from "../../services/home-display.service";
import {HomestayApiServiceService} from "../../services/homestay-api-service.service";

@Component({
  selector: 'app-add-home-stay',
  templateUrl: './add-home-stay.component.html',
  styleUrl: './add-home-stay.component.css'
})
export class AddHomeStayComponent {

  constructor(
    private serviceForHomeStayTypes: HomeDisplayService,
    private serviceForHttp: HomestayApiServiceService)
  {

  }

  public currentRooms: number = 0
  public currentBeds: number = 0
  public currentBathrooms: number = 0
  public currentType: string = "";
  public currentDesc: string = "";
  public currentInitDate: Date = new Date();
  public currentFinishDate: Date = new Date();
  public currentRules: string = "";
  public currentLocation: string = "";
  public currentStreetAddress: string = "";
  public currentServices: string = "";
  public currentStreetNumber?: number = 0;
  public currentDepNumber?: number = 0;
  public currentSecurityOptions?: string;
  public currentArrivalOptions?: string;

  readonly CONSTANTS = {
    roomsNumberLabel: "Número de Dormitorios",
    bedsNumberLabel : "Número de Camas disponible",
    bathsNumberLabel: "Número de Baños disponible",
    homeStayTypeLabel: "Tipo de Propiedad",
    descriptionLabel: "Descripción de la propiedad",
    availableDateLabel: "Fechas de disponibilidad",
    rulesLabel: "Reglas",
    locationLabel: "Ubicación (Comuna)",
    streetAddressLabel: "Calle",
    homeStayNumberAddress: "Número de Casa (opcional)",
    homeStayDeptNumberAddress: "Número de Departamento (opcional)",
    servicesAvailableLabel: "Servicios disponibles",
    securityOptionsLabel: "Opciones de Seguridad",
    arrivalOptionsLabel: "Opciones de Llegada",
    submitButtonLabel: "Enviar Formulario"
  }


  public getHomeStayTypes(): HomeStayType[] {
    return this.serviceForHomeStayTypes.getHomeStayTypes()
  }

  public sendDataToValidation() {
    const form: HomeStayForm = {
      rooms : this.currentRooms,
      beds: this.currentBeds,
      bathrooms : this.currentBathrooms,
      type: this.currentType,
      desc: this.currentDesc,
      initDate: this.currentInitDate,
      finishDate: this.currentFinishDate,
      rules: this.currentRules,
      location: this.currentLocation,
      services: this.currentServices,
      street: this.currentStreetAddress,
      streetNumber: this.currentStreetNumber,
      depNumber : this.currentDepNumber,
      securityOptions: this.currentSecurityOptions,
      arrivalOptions : this.currentArrivalOptions
    }

    this.serviceForHttp.validateForm(form)
  }



  public currentHomeStayForm?: HomeStayForm

}

export interface HomeStayForm {
  rooms: number,
  beds: number,
  bathrooms: number,
  type: string,
  desc: string,
  initDate: Date,
  finishDate: Date,
  rules: string,
  location: string
  street: string,
  services: string,
  streetNumber?: number,
  depNumber?: number,
  securityOptions?: string,
  arrivalOptions?: string
}

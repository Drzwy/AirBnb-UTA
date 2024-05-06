import { Component } from '@angular/core';

@Component({
  selector: 'app-add-home-stay',
  templateUrl: './add-home-stay.component.html',
  styleUrl: './add-home-stay.component.css'
})
export class AddHomeStayComponent {
  public currentRooms: number = 0
  public currentBeds: number = 0
  public currentBathrooms: number = 0
  public type: string = "";
  public desc: string = "";
  public initDate: Date = new Date();
  public finishDate: Date = new Date();
  public rules: string = "";
  public location: string = "";
  public street: string = "";
  public depNumber?: number;
  public securityOptions?: string;
  public arrivalOptions?: string;






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
  depNumber?: number,
  securityOptions?: string,
  arrivalOptions?: string
}

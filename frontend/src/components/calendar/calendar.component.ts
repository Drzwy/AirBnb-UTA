import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  constructor() {
    
   }

  ngOnInit() {
  }

  @Output() startDate: any = new EventEmitter<Date>();
  @Output() endDate: any = new EventEmitter<Date>();
  @Output() nights: any = new EventEmitter<number>();
  @Input() location: any;

  //fechas minima y maxima para seleccionar (maxDate puede ser Date o undefined para evitar selecionar fechas deshabilitadas en el rango)
  minDate: Date = new Date()
  maxDate: Date | undefined;

  //Aqui se guardan las fechas seleccionadas
  rangeDates: Date[] = [];
  date1: Date = new Date('05/26/2024') // ejemplos para desactivar fechas en el calendario
  date2: Date = new Date('05/28/2024')
  invalidDate: Date[] = [this.date1,this.date2]
  selectedNights: number = 0;

  public clearSelection(){
    this.rangeDates = []
    this.maxDate = undefined
    this.minDate = new Date()
    this.selectedNights = 0
    this.startDate.emit(this.rangeDates[0]);
    this.endDate.emit(this.rangeDates[1]);
    this.nights.emit(this.selectedNights);
  }

  onDateSelect() {
    if (this.rangeDates && this.rangeDates[0]) {
      // Primer día seleccionado, calcular la fecha máxima
      this.updateMinMaxDate(this.rangeDates[0]);
      this.startDate.emit(this.rangeDates[0]);
      if (this.rangeDates[1]){
        this.minDate = new Date()
        this.maxDate = undefined;

        const startDate = this.rangeDates[0];
        const endDate = this.rangeDates[1];

        const differenceMs = endDate.getTime() - startDate.getTime();
        const differenceDays = Math.ceil(differenceMs / (1000 * 60 * 60 * 24));

        this.selectedNights = differenceDays;

        this.endDate.emit(this.rangeDates[1]);
        this.nights.emit(this.selectedNights);
      }
    }
  } 
  

  updateMinMaxDate(startDate: Date) {
    this.minDate = startDate
    for (let invalidDate of this.invalidDate) {
      if (invalidDate > startDate) {
        this.maxDate = new Date(invalidDate); // Un día antes del primer día deshabilitado
        this.maxDate.setDate(this.maxDate.getDate() - 1);
        break;
      }
    }
  }

}

import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { BookingService } from '../../services/booking.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent implements OnInit {
  constructor(
    private bookingService: BookingService
  ) {}

  @Output() startDate: any = new EventEmitter<Date>();
  @Output() endDate: any = new EventEmitter<Date>();
  @Output() nights: any = new EventEmitter<number>();
  @Input() location: any;

  ngOnInit(){
    this.startDateSubscription = this.bookingService.startDate$.subscribe(date =>{
      this.date1 = date;
      if(this.date1){
        this.rangeDates[0] = this.date1;
      }else{
        this.rangeDates = []
        this.selectedNights = 0;
        this.startDate.emit(this.rangeDates[0]);
        this.endDate.emit(this.rangeDates[1]);
        this.nights.emit(this.selectedNights);
      }
      this.onDateSelect()
    })
    this.endDateSubscription = this.bookingService.endDate$.subscribe(date =>{
      this.date2 = date;
      if(this.date2){
        this.rangeDates[1] = this.date2;
      }
      this.onDateSelect()
    })
    
  }

  private startDateSubscription?: Subscription;
  private endDateSubscription?: Subscription;
  public date1: Date | null = null;
  public date2: Date | null = null;

  //fechas minima y maxima para seleccionar (maxDate puede ser Date o undefined para evitar selecionar fechas deshabilitadas en el rango)
  minDate: Date = new Date();
  maxDate: Date | undefined;

  //Aqui se guardan las fechas seleccionadas
  // date1: Date = new Date('06/26/2024'); // ejemplos para desactivar fechas en el calendario
  // date2: Date = new Date('06/28/2024');
  invalidDate: Date[] = []; // se ingresan aqui las fechas no disponibles y se desactivan en el calendario
  selectedNights: number = 0;
  rangeDates: Date[] = [];

  

  public clearSelection() {
    this.rangeDates = [];
    this.bookingService.clearSelection();
    this.maxDate = undefined;
    this.minDate = new Date();
  }

  onDateSelect() {
    if (this.rangeDates && this.rangeDates[0]) {
      // Primer día seleccionado, calcular la fecha máxima
      this.updateMinMaxDate(this.rangeDates[0]);
      this.startDate.emit(this.rangeDates[0]);
      if(this.date1 != this.rangeDates[0]){
        this.bookingService.addStartDate(this.rangeDates[0])
      }
      if (this.rangeDates[1]) {
        this.minDate = new Date();
        this.maxDate = undefined;

        const startDate = this.rangeDates[0];
        const endDate = this.rangeDates[1];

        const differenceMs = endDate.getTime() - startDate.getTime();
        const differenceDays = Math.ceil(differenceMs / (1000 * 60 * 60 * 24));

        this.selectedNights = differenceDays;

        if(this.date2 != this.rangeDates[1]){
          this.bookingService.addEndDate(this.rangeDates[1])
        }
        this.endDate.emit(this.rangeDates[1]);
        this.nights.emit(this.selectedNights);
        
      }
    }
  }

  updateMinMaxDate(startDate: Date) {
    this.minDate = startDate;
    for (let invalidDate of this.invalidDate) {
      if (invalidDate > startDate) {
        this.maxDate = new Date(invalidDate); // Un día antes del primer día deshabilitado
        this.maxDate.setDate(this.maxDate.getDate() - 1);
        break;
      }
    }
  }
}

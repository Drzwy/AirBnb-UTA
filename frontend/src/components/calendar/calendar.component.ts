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

  @Output() nights: any = new EventEmitter<number>();
  @Output() dates: any = new EventEmitter<Date[]>();
  @Input() location: any;
  @Input() invalidDate: Date[] = []; // se ingresan aqui las fechas no disponibles y se desactivan en el calendario

  ngOnInit(){
    this.noDates = this.invalidDate.map(date => date = new Date(date))
    this.rangeDatesSubscription = this.bookingService.rangeDates$.subscribe(dates =>{
      this.rangeDates = dates
      this.dates.emit(this.rangeDates)
      this.calculateNights();
    })    
  }
  private rangeDatesSubscription?: Subscription;
  private startDateSubscription?: Subscription;
  private endDateSubscription?: Subscription;
  public noDates: Date[] = []

  //fechas minima y maxima para seleccionar (maxDate puede ser Date o undefined para evitar selecionar fechas deshabilitadas en el rango)
  minDate: Date = new Date();
  maxDate: Date | undefined;

  selectedNights: number = 0;
  rangeDates: Date[] = [];

  public clearSelection() {
    this.bookingService.clearSelection();
    this.maxDate = undefined;
    this.minDate = new Date();
    this.selectedNights = 0
  }

  public onSelection(){
    this.changeRangeDates()
    this.onDateSelect()
  }

  public changeRangeDates(){
    this.bookingService.changeRangeDates(this.rangeDates)
    this.dates.emit(this.rangeDates)
  }

  public onDateSelect() {
    if (this.rangeDates && this.rangeDates[0]) {
      // Primer día seleccionado, calcular la fecha máxima
      this.updateMinMaxDate(this.rangeDates[0]);

      if (this.rangeDates[1]) {
        this.minDate = new Date();
        this.maxDate = undefined;   
      }
    }
  }

  public calculateNights(){
    if(this.rangeDates[0] && this.rangeDates[1]){
      const startDate = this.rangeDates[0];
      const endDate = this.rangeDates[1];

      const differenceMs = endDate.getTime() - startDate.getTime();
      const differenceDays = Math.ceil(differenceMs / (1000 * 60 * 60 * 24));

      this.selectedNights = differenceDays;   
      this.nights.emit(this.selectedNights);
    } else{
      this.selectedNights = 0
      this.nights.emit(this.selectedNights)
    }
    
  }

  public updateMinMaxDate(startDate: Date) {
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

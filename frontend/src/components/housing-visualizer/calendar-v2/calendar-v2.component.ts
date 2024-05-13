import { Component, EventEmitter, Input, Output } from '@angular/core';

interface MonthInfo {
  name: string;
  index: number;
  year: number;
}

@Component({
  selector: 'app-calendar-v2',
  templateUrl: './calendar-v2.component.html',
  styleUrls: ['./calendar-v2.component.css']
})

export class CalendarV2Component {

  @Output() startDate: any = new EventEmitter<Date>();
  @Output() endDate: any = new EventEmitter<Date>();
  @Output() nights: any = new EventEmitter<number>();
  @Input() location: any;

  today: Date = new Date();
  selectedStartDate: Date | null;
  selectedEndDate: Date | null;
  selectedMonth: number;
  clickedDate: Date | null;

  selectedNights: number = 0;
  selectedNightsText: string = 'Selecciona la fecha de llegada';
  selectedDatesText: string = 'Agrega las fechas de viaje para obtener precios exactos';

  constructor() {
    this.selectedMonth = this.today.getMonth();
    this.clickedDate = null;
    this.selectedStartDate = null;
    this.selectedEndDate = null;
  }

  calculateSelectedNightsAndDates(): void {
    if (this.selectedStartDate && this.selectedEndDate) {
      const differenceInTime = this.selectedEndDate.getTime() - this.selectedStartDate.getTime();
      const differenceInDays = differenceInTime / (1000 * 3600 * 24);
      this.selectedNights = differenceInDays;
      this.nights.emit(this.selectedNights);

      // Formatear fechas seleccionadas
      const startDateOptions = { day: '2-digit', month: 'short', year: 'numeric' } as Intl.DateTimeFormatOptions;
      let startDateString = this.selectedStartDate.toLocaleDateString('es-ES', startDateOptions);
      startDateString = startDateString.split(' ')[0] + " de " + startDateString.split(' ')[1] + ". de " + startDateString.split(' ')[2];
      const endDateOptions = { day: '2-digit', month: 'short', year: 'numeric' } as Intl.DateTimeFormatOptions;
      let endDateString = this.selectedEndDate.toLocaleDateString('es-ES', endDateOptions);
      endDateString = endDateString.split(' ')[0] + " de " + endDateString.split(' ')[1] + ". de " + endDateString.split(' ')[2];
      
      // Actualizar textos
      if (this.location){
        this.selectedNightsText = this.selectedNights + " noches en " + this.location.split(',')[0];
      }
      else{
        this.selectedNightsText = this.selectedNights + " noches";
      }
      this.selectedDatesText = `${startDateString} - ${endDateString}`;
    } else {
      this.selectedNights = 0;
      this.nights.emit(this.selectedNights);
      this.selectedNightsText = 'Selecciona la fecha de llegada';
      this.selectedDatesText = 'Agrega las fechas de viaje para obtener precios exactos';
    }
  }

  isCurrentMonth(month: number, year: number): boolean {
    const currentMonth = this.today.getMonth();
    const currentYear = this.today.getFullYear();
    return currentMonth === month && currentYear === year;
  }

  getMonths(): MonthInfo[] {
    const months: MonthInfo[] = [];
    const currentYear = this.today.getFullYear();
    const currentMonth = this.selectedMonth;

    // Primer mes
    months.push({ name: this.getMonthName(currentMonth), index: currentMonth, year: currentYear });

    // Segundo mes
    const nextMonth = currentMonth === 11 ? 0 : currentMonth + 1;
    const nextYear = currentMonth === 11 ? currentYear + 1 : currentYear;
    months.push({ name: this.getMonthName(nextMonth), index: nextMonth, year: nextYear });

    return months;
  }

  getMonthName(month: number): string {
    const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    return months[month];
  }


  getDaysInMonth(year: number, month: number): number {
    return new Date(year, month + 1, 0).getDate();
  }

  isToday(day: number, month: number, year: number): boolean {
    const today = new Date();
    const currentDate = new Date(year, month, day);
    return currentDate.toDateString() === today.toDateString();
  }

  isSelectedDay(day: number, month: number, year: number): string {
    const currentDate = new Date(year, month, day);
    if (this.selectedStartDate && this.selectedEndDate && day !== 0) {
      if (currentDate.getTime() === this.selectedStartDate.getTime()) {
        return 'selected';
      }
      if (currentDate.getTime() === this.selectedEndDate.getTime()) {
        return 'selected';
      }
      if (currentDate > this.selectedStartDate && currentDate < this.selectedEndDate) {
        return 'between';
      }
    } else if (this.selectedStartDate && currentDate.getTime() === this.selectedStartDate.getTime()) {
      return 'selected';
    }
    return '';
  }

  isDisabled(day: number, month: number, year: number): boolean {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Establecer horas a 0 para ignorar la hora
    const currentDate = new Date(year, month, day);
    if (this.selectedStartDate) {
      return currentDate < this.selectedStartDate || currentDate < today;
    }
    return currentDate < today;
  }

  selectDay(day: number, month: number, year: number): void {
    const currentDate = new Date(year, month, day);
    if (!this.isDisabled(day, month, year)) {
      if (this.selectedStartDate && this.selectedEndDate) {
        if (currentDate.getTime() === this.selectedStartDate.getTime() || currentDate.getTime() === this.selectedEndDate.getTime()) {
          // Si se selecciona uno de los días ya seleccionados, no hacemos ningún cambio
          return;
        } else if (currentDate > this.selectedStartDate && currentDate < this.selectedEndDate) {
          // Si la fecha actual está entre los dos días seleccionados, seleccionamos el día actual como nuevo selectedStartDate
          this.selectedStartDate = currentDate;
          this.selectedEndDate = null;
          this.clickedDate = currentDate;
          this.startDate.emit(this.selectedStartDate); //emitiendo la startDate
          console.log("emitio Start")
          this.calculateSelectedNightsAndDates(); // Calcular de nuevo noches seleccionadas y fechas
          return;
        } else {
          // Si la fecha actual está fuera de los días seleccionados, seleccionamos el día actual como nuevo selectedStartDate
          this.selectedStartDate = currentDate;
          this.selectedEndDate = null;
          this.clickedDate = currentDate;
          this.selectedEndDate = null;
          this.startDate.emit(this.selectedStartDate); //emitiendo la startDate
          console.log("emitio Start")
          this.calculateSelectedNightsAndDates(); // Calcular de nuevo noches seleccionadas y fechas
          return;
        }
      }
      // Si no se cumple ninguna de las condiciones anteriores, seleccionamos el día actual
      if (!this.selectedStartDate || currentDate < this.selectedStartDate) {
        this.selectedStartDate = currentDate;
        this.selectedEndDate = null;
        this.startDate.emit(this.selectedStartDate); //emitiendo la startDate
        console.log("emitio Start")
      } else if (!this.selectedEndDate || currentDate > this.selectedEndDate) {
        this.selectedEndDate = currentDate;
        this.endDate.emit(this.selectedEndDate); // emitiendo la endDate
        console.log("emitio end")
      }
      this.clickedDate = currentDate;
      this.calculateSelectedNightsAndDates(); // Calcular de nuevo noches seleccionadas y fechas
    }
  }

  clearSelection(): void {
    this.selectedStartDate = null;
    this.selectedEndDate = null;
    this.calculateSelectedNightsAndDates(); // Calcular de nuevo noches seleccionadas y fechas
    this.startDate.emit(this.selectedStartDate);
    this.endDate.emit(this.selectedEndDate);
  }
  
  previousMonth(): void {
    this.selectedMonth--;
    if (this.selectedMonth < 0) {
      this.selectedMonth = 11;
      this.today.setFullYear(this.today.getFullYear() - 1);
    }
  }

  nextMonth(): void {
    this.selectedMonth++;
    if (this.selectedMonth > 11) {
      this.selectedMonth = 0;
      this.today.setFullYear(this.today.getFullYear() + 1);
    }
  }

  getWeeksInMonth(year: number, month: number): { day: number }[][] {
    const weeks: { day: number }[][] = [];
    const firstDayOfMonth = new Date(year, month, 1);
    let firstDayOfWeek = firstDayOfMonth.getDay(); // Obtener el día de la semana del primer día del mes (0: domingo, 1: lunes, ..., 6: sábado)
  
    // Ajustar el primer día de la semana si no es lunes
    if (firstDayOfWeek === 0) {
      firstDayOfWeek = 7; // Convertir domingo (0) a 7 para comenzar la semana en lunes
    }
  
    const daysInMonth = new Date(year, month + 1, 0).getDate(); // Obtener el número de días en el mes
  
    let currentWeek: { day: number }[] = [];
  
    // Llenar los días anteriores si el primer día no es lunes
    for (let i = 1; i < firstDayOfWeek; i++) {
      currentWeek.push({ day: 0 }); // Agregar días vacíos hasta llegar al primer día de la semana
    }
  
    // Rellenar el resto de los días del mes
    for (let i = 1; i <= daysInMonth; i++) {
      if (currentWeek.length === 7) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
      currentWeek.push({ day: i });
    }
  
    // Rellenar con ceros los días restantes de la última semana
    while (currentWeek.length < 7) {
      currentWeek.push({ day: 0 });
    }
  
    weeks.push(currentWeek);
  
    return weeks;
  }
  
  
}

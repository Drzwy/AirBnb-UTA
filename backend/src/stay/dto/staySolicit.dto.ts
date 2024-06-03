import { IsDate, IsNotEmpty, IsNumber } from 'class-validator';

export class SolicitStayDTO {
  @IsNotEmpty()
  @IsDate()
  fechaIni: Date;

  @IsNotEmpty()
  @IsDate()
  fechaFin: Date;

  @IsNotEmpty()
  @IsNumber()
  huespedId: number;

  @IsNotEmpty()
  @IsNumber()
  propiedadId: number;
}

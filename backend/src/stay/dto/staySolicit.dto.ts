import { IsDate, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class SolicitStayDTO {
  @IsNotEmpty()
  @IsDate()
  fechaIni: Date;

  @IsNotEmpty()
  @IsDate()
  fechaFin: Date;

  @IsNotEmpty()
  @IsNumber()
  nochesDeEstadia: number;

  @IsNotEmpty()
  @IsNumber()
  costoNoche: number;

  @IsNotEmpty()
  @IsNumber()
  nroAdultos: number;

  @IsOptional()
  @IsNumber()
  nroNinos?: number;

  @IsOptional()
  @IsNumber()
  nroBebes?: number;

  @IsOptional()
  @IsNumber()
  nroMascotas?: number;

  @IsNotEmpty()
  @IsNumber()
  costoHospedaje: number;

  @IsOptional()
  @IsNumber()
  tarifaServicio?: number;

  @IsOptional()
  @IsNumber()
  tarifaLimpieza?: number;

  @IsNotEmpty()
  @IsNumber()
  metodoDePagoId: number;

  @IsNotEmpty()
  @IsNumber()
  usuarioPagadorId: number;

  @IsNotEmpty()
  @IsNumber()
  huespedId: number;

  @IsNotEmpty()
  @IsNumber()
  propiedadId: number;
}

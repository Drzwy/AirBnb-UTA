import { Type } from 'class-transformer';
import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

export class HomeStayFilterDTO {
  @IsOptional()
  @IsNumber()
  dormitorios: number;

  @IsOptional()
  @IsNumber()
  camas: number;

  @IsOptional()
  @IsNumber()
  banos: number;

  @IsOptional()
  @IsNumber()
  precioNocheMin: number;

  @IsOptional()
  @IsNumber()
  precioNocheMax: number;

  @IsOptional()
  @IsNumber()
  nroAdultos: number;

  @IsOptional()
  @IsNumber()
  nroNinos: number;

  @IsOptional()
  @IsNumber()
  nroBebes: number;

  @IsOptional()
  @IsNumber()
  nroMascotas: number;

  @IsOptional()
  @IsString()
  tipo: string;

  @IsOptional()
  @IsString()
  pais: string;

  @IsOptional()
  @IsString()
  ciudad: string;

  @IsOptional()
  @IsDate()
  fechaInicio: Date;

  @IsOptional()
  @IsDate()
  fechaFin: Date;

  @IsOptional()
  @Type(() => String)
  comodidades: string[] | string;

  @IsOptional()
  @Type(() => String)
  opcionesDeSeguridad: string[] | string;

  @IsOptional()
  @Type(() => String)
  opcionesDeLlegada: string[] | string;

  @IsOptional()
  @Type(() => String)
  reglas: string[] | string;
}

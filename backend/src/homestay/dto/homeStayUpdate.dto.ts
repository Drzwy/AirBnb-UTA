import { Type } from 'class-transformer';
import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

export class HomeStayUpdateDTO {
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
  @IsString()
  tipo: string;

  @IsOptional()
  @IsString()
  descripcion: string;

  @IsOptional()
  @IsArray()
  @Type(() => Date)
  fechas_disponibles: Date[];

  @IsOptional()
  @IsArray()
  @Type(() => String)
  reglas: string[];

  @IsOptional()
  @IsString()
  calle: string;

  @IsOptional()
  @IsNumber()
  numero_casa: number;

  @IsOptional()
  @IsNumber()
  numero_dpto: number;

  @IsOptional()
  @IsArray()
  @Type(() => String)
  comodidades: string[];

  @IsOptional()
  @IsArray()
  @Type(() => String)
  opciones_de_seguridad: string[];

  @IsOptional()
  @IsArray()
  @Type(() => String)
  opciones_de_llegada: string[];

  @IsOptional()
  @IsNumber()
  ownerId: number;
}

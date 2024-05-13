import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class HomeStayCreateDTO {
  @IsNotEmpty()
  @IsNumber()
  dormitorios: number;

  @IsNotEmpty()
  @IsNumber()
  camas: number;

  @IsNotEmpty()
  @IsNumber()
  banos: number;

  @IsNotEmpty()
  @IsString()
  tipo: string;

  @IsNotEmpty()
  @IsString()
  descripcion: string;

  @IsNotEmpty()
  @IsArray()
  @Type(() => Date)
  fechas_disponibles: Date[];

  @IsNotEmpty()
  @IsArray()
  @Type(() => String)
  reglas: string[];

  @IsNotEmpty()
  @IsString()
  calle: string;

  @IsNotEmpty()
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

  @IsNotEmpty()
  @IsNumber()
  ownerId: number;

  constructor () {}
}

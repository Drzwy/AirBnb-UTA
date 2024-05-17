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
  @IsArray()
  @Type(() => Date)
  fechasDisponibles: Date[];

  @IsNotEmpty()
  @IsNumber()
  precioNoche: number;

  @IsNotEmpty()
  @IsString()
  tipo: string;

  @IsNotEmpty()
  @IsString()
  descripcion: string;

  @IsNotEmpty()
  @IsString()
  calle: string;

  @IsNotEmpty()
  @IsNumber()
  nroCasa: number;

  @IsOptional()
  @IsNumber()
  nroDpto: number;

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
  @IsArray()
  @Type(() => String)
  reglas: string[];

  @IsNotEmpty()
  @IsNumber()
  anfitrionId: number;

  @IsNotEmpty()
  @IsString()
  pais: string;

  @IsNotEmpty()
  @IsString()
  ciudad: string;
}

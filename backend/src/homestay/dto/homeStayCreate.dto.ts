import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
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
  fechasOcupadas: Date[];

  @IsNotEmpty()
  @IsNumber()
  precioNoche: number;

  @IsNotEmpty()
  @IsNumber()
  maxAdultos: number;

  @IsNotEmpty()
  @IsNumber()
  maxNinos: number;

  @IsNotEmpty()
  @IsNumber()
  maxBebes: number;

  @IsNotEmpty()
  @IsNumber()
  maxMascotas: number;

  @IsNotEmpty()
  @IsString()
  tipo: string;

  @IsNotEmpty()
  @IsString()
  titulo: string;

  @IsNotEmpty()
  @IsString()
  descripcion: string;

  @IsNotEmpty()
  @IsString()
  pais: string;

  @IsNotEmpty()
  @IsString()
  ciudad: string;

  @IsNotEmpty()
  @IsString()
  calle: string;

  @IsNotEmpty()
  @IsNumber()
  nroCasa: number;

  @IsOptional()
  @IsString()
  nroDpto: string;

  @IsNotEmpty()
  @IsArray()
  @Type(() => String)
  comodidades: string[];

  @IsNotEmpty()
  @IsArray()
  @Type(() => String)
  opcionesDeSeguridad: string[];

  @IsNotEmpty()
  @IsArray()
  @Type(() => String)
  opcionesDeLlegada: string[];

  @IsNotEmpty()
  @IsArray()
  @Type(() => String)
  reglas: string[];

  @IsNotEmpty()
  @IsArray()
  @ArrayNotEmpty()
  @Type(() => String)
  fotos: string[];

  @IsNotEmpty()
  @IsNumber()
  anfitrionId: number;
}

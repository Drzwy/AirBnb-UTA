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
  @IsArray()
  @Type(() => Date)
  fechasOcupadas: Date[];

  @IsOptional()
  @IsNumber()
  precioNoche: number;

  @IsOptional()
  @IsNumber()
  maxAdultos: number;

  @IsOptional()
  @IsNumber()
  maxNinos: number;

  @IsOptional()
  @IsNumber()
  maxBebes: number;

  @IsOptional()
  @IsNumber()
  maxMascotas: number;

  @IsOptional()
  @IsString()
  tipo: string;

  @IsOptional()
  @IsString()
  titulo: string;

  @IsOptional()
  @IsString()
  descripcion: string;

  @IsOptional()
  @IsString()
  pais: string;

  @IsOptional()
  @IsString()
  ciudad: string;

  @IsOptional()
  @IsString()
  calle: string;

  @IsOptional()
  @IsNumber()
  nroCasa: number;

  @IsOptional()
  @IsString()
  nroDpto: string;

  @IsOptional()
  @IsArray()
  @Type(() => String)
  comodidades: string[];

  @IsOptional()
  @IsArray()
  @Type(() => String)
  opcionesDeSeguridad: string[];

  @IsOptional()
  @IsArray()
  @Type(() => String)
  opcionesDeLlegada: string[];

  @IsOptional()
  @IsArray()
  @Type(() => String)
  reglas: string[];

  @IsOptional()
  @IsArray()
  @Type(() => String)
  fotos: string[];

  @IsOptional()
  @IsNumber()
  anfitrionId: number;
}

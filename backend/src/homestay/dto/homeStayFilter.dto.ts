import { IsNumber, IsOptional, IsString } from 'class-validator';

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
}

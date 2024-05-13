import { Type } from 'class-transformer';
import { IsArray, IsEmail, IsOptional, IsString } from 'class-validator';

export class UserUpdateDto {
  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  hash?: string;

  @IsString()
  @IsOptional()
  nombre?: string;

  @IsString()
  @IsOptional()
  apellidoPat?: string;

  @IsString()
  @IsOptional()
  apellidoMat?: string;

  @IsString()
  @IsOptional()
  descripcion?: string;

  @IsArray()
  @IsOptional()
  @Type(() => String)
  idiomas?: string[];

  @IsArray()
  @IsOptional()
  @Type(() => String)
  detalles?: string[];
}

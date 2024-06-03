import { Type } from 'class-transformer';
import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class UserRegisterDTO {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  hash: string;

  @IsString()
  @IsNotEmpty()
  run: string;

  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  apellidoPat: string;

  @IsString()
  @IsNotEmpty()
  apellidoMat: string;

  @IsString()
  @IsOptional()
  descripcion: string;

  @IsArray()
  @IsNotEmpty()
  @Type(() => String)
  idiomas: string[];

  @IsArray()
  @IsNotEmpty()
  @Type(() => String)
  detalles: string[];
}

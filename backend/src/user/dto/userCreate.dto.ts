import { UserTypes } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class UserCreateDTO {
  @IsString()
  @IsEnum(UserTypes)
  tipoUsuario: UserTypes;

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
  descripcion: string;

  @IsArray()
  @Type(() => String)
  idiomas: string[];

  @IsArray()
  @Type(() => String)
  detalles: string[];
}

import { Type } from 'class-transformer';
import { IsArray, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class RegisterDTO {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

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

export class LoginDTO {
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

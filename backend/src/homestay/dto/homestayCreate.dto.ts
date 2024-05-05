import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class HomestayCreateDTO {
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsNumber()
  huespedId: number;

  @IsNotEmpty()
  @IsNumber()
  anfitrionId: number;
}

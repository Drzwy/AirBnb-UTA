import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePMDTO {
  @IsNotEmpty()
  @IsString()
  infoTarjeta: string;
}

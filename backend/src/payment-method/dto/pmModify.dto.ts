import { IsNotEmpty, IsString } from 'class-validator';

export class ModifyPMDTO {
  @IsNotEmpty()
  @IsString()
  infoTarjeta: string;
}

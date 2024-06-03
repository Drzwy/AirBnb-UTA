import { IsNotEmpty, IsNumber } from 'class-validator';

export class StayIdsDTO {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsNumber()
  huespedId: number;

  @IsNotEmpty()
  @IsNumber()
  propiedadId: number;
}

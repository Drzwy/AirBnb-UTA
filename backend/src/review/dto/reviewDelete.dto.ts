import { IsNotEmpty, IsNumber } from 'class-validator';

export class DeleteReviewDTO {
  @IsNotEmpty()
  @IsNumber()
  usuarioCreadorId: number;

  @IsNotEmpty()
  @IsNumber()
  receptorId: number;
}

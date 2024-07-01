import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class ModifyReviewDTO {
  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsOptional()
  @IsNumber()
  puntuacion?: number;

  @IsNotEmpty()
  @IsNumber()
  usuarioCreadorId: number;

  @IsNotEmpty()
  @IsNumber()
  receptorId: number;
}

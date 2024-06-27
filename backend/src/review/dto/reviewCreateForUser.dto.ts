import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateUserReviewDTO {
  @IsString()
  @IsOptional()
  descripcion?: string;

  @IsNumber()
  @IsNotEmpty()
  puntuacion: number;

  @IsNumber()
  @IsNotEmpty()
  usuarioCriticadoId: number;
}

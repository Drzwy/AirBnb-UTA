import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateHomeStayReviewDTO {
  @IsString()
  @IsOptional()
  descripcion?: string;

  @IsNumber()
  @IsNotEmpty()
  puntuacion: number;

  @IsNumber()
  @IsNotEmpty()
  propiedadCriticadaId: number;
}

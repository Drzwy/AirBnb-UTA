import { IsDate, IsNotEmpty, IsOptional } from 'class-validator';
import { StayIdsDTO } from './stayIds.dto';

export class ModifyStayDTO {
  @IsOptional()
  @IsDate()
  fechaIni?: Date;

  @IsOptional()
  @IsDate()
  fechaFin?: Date;

  @IsNotEmpty()
  ids: StayIdsDTO;
}

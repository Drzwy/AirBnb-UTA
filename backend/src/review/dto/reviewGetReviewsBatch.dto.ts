import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty } from 'class-validator';

export class GetReviewBatch {
  @IsNotEmpty()
  @IsArray()
  @Type(() => Number)
  idBatch: number[];
}

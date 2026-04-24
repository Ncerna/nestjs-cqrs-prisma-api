import { IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export class GetProductByIdDto {
  @Type(() => Number)
  @IsInt()
  id!: number;
}
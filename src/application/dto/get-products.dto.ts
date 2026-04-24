import { IsOptional, IsInt, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class GetProductsDto {

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  size?: number = 10;

  @IsOptional()
  @IsString()
  search?: string;
}
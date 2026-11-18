import { Type } from 'class-transformer';
import { IsBoolean, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, Min } from 'class-validator';

export class CreateServiceProviderDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  speed: number;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  price_per_month: number;

  @IsOptional()
  @IsBoolean()
  is_active?: boolean;
}
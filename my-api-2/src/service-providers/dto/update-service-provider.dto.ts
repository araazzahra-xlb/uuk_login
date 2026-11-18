import { Type } from 'class-transformer';
import { IsBoolean, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, Min } from 'class-validator';

export class UpdateServiceProviderDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  speed?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  price_per_month?: number;

  @IsOptional()
  @IsBoolean()
  is_active?: boolean;
}

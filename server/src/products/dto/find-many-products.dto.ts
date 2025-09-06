import { Status } from '@prisma/client';
import { Transform } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  Min,
} from 'class-validator';
import { FindManyDto } from '../../common/dto';

export class FindManyProductsDto extends FindManyDto {
  @Transform(({ value }: { value?: string }) =>
    value ? value?.split('-').map((val) => +val) : value,
  )
  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  @IsNumber({ allowInfinity: false, allowNaN: false }, { each: true })
  @Min(0, { each: true })
  @IsOptional({ each: true })
  price?: [number, number];

  @IsOptional()
  @IsEnum(Status)
  status?: Status;

  @Transform(({ value }: { value?: string }) =>
    value ? value.split('-').map((val) => +val) : value,
  )
  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  @IsNumber({ allowInfinity: false, allowNaN: false }, { each: true })
  @Min(0, { each: true })
  @IsOptional({ each: true })
  inStock?: [number, number];

  @IsDateString()
  @IsOptional()
  from?: string;

  @IsDateString()
  @IsOptional()
  to?: string;
}

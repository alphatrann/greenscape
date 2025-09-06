import { Status } from '@prisma/client';
import { Transform } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsBoolean,
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
} from 'class-validator';
import { FindManyDto } from '../../common/dto';

export class FindManyProductsDto extends FindManyDto {
  @Transform(({ value }: { value: string }) =>
    value.split(',').map((val) => +val),
  )
  @IsNumber({ allowInfinity: false, allowNaN: false }, { each: true })
  @IsOptional()
  ids?: number[];

  @Transform(({ value }: { value: string }) =>
    value.split(',').map((val) => +val),
  )
  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  @IsNumber({ allowInfinity: false, allowNaN: false }, { each: true })
  @IsOptional({ each: true })
  price?: [number, number];

  @IsOptional()
  @IsEnum(Status)
  status?: Status;

  @Transform(({ value }) => (value === 'false' ? false : true))
  @IsOptional()
  @IsBoolean()
  inStock?: boolean;

  @IsDateString()
  @IsOptional()
  from?: string;

  @IsDateString()
  @IsOptional()
  to?: string;
}

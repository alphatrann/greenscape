import { OmitType } from '@nestjs/mapped-types';
import { Transform, Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsDateString,
  IsIn,
  IsNumber,
  IsOptional,
  Min,
} from 'class-validator';
import { FindManyDto } from '../../common/dto';
import { allowedCountries } from '../../common/utils';

export class FindManyOrdersDto extends OmitType(FindManyDto, ['q']) {
  @IsOptional()
  @IsIn(['delivered', 'pending'])
  status?: 'delivered' | 'pending';

  @IsDateString()
  @IsOptional()
  from?: string;

  @IsDateString()
  @IsOptional()
  to?: string;

  @IsOptional()
  @Transform(({ value }: { value: string }) =>
    value?.split('-').map((val) => +val * 100),
  )
  @Min(0, { each: true })
  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  @IsNumber(
    { allowInfinity: false, allowNaN: false, maxDecimalPlaces: 2 },
    { each: true },
  )
  totalRange?: [number, number];

  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2, allowInfinity: false, allowNaN: false })
  @IsOptional()
  shippingCost?: number;

  @Transform(({ value }: { value: string }) => value.split(','))
  @ArrayMinSize(1)
  @IsIn(allowedCountries, { each: true })
  @IsOptional()
  countries?: string[];

  @IsOptional()
  @IsIn(['total', 'shippingCost', 'createdAt', 'deliveredAt', 'id', 'tax'])
  sortBy?: string;
}

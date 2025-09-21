import { OmitType } from '@nestjs/mapped-types';
import { FindManyProductsDto } from './find-many-products.dto';

export class FindManyStoreProductsDto extends OmitType(FindManyProductsDto, [
  'status',
  'from',
  'to',
]) {}

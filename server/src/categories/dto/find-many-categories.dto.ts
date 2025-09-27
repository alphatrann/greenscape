import { IsIn, IsOptional } from 'class-validator';
import { FindManyDto } from '../../common/dto';

export class FindManyCategoriesDto extends FindManyDto {
  @IsOptional()
  @IsIn(['products', 'subCategories', 'id'])
  sortBy?: string;
}

import { IsInt, IsOptional, Length, Matches, Min } from 'class-validator';
import { VALID_SLUG_REGEX } from '../../common/constants';

export class CreateCategoryDto {
  @Length(1, 60)
  name: string;

  @Length(1, 120)
  @Matches(VALID_SLUG_REGEX, { message: 'invalid slug' })
  slug: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  parentCategoryId: number;
}

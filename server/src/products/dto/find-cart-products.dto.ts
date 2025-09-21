import { Transform } from 'class-transformer';
import { IsArray, IsInt, Min } from 'class-validator';

export class FindCartProductsDto {
  @Transform(({ value }: { value: string }) => value.split(',').map(Number))
  @IsArray()
  @IsInt({ each: true })
  @Min(1, { each: true })
  ids: number[];
}

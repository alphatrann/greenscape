import { Prisma } from '@prisma/client';
import { FindManyCategoriesDto } from '../dto';

export function formQueries(
  { q, sortBy = 'id', order = 'asc' }: FindManyCategoriesDto,
  slug: string = null,
) {
  const where: Prisma.CategoryWhereInput = {
    parentCategory: q ? undefined : slug ? { slug } : null,
    name: {
      contains: q,
      mode: 'insensitive',
    },
  };
  let orderBy = {};
  if (sortBy === 'products' || sortBy === 'subCategories')
    orderBy = { [sortBy]: { _count: order } };
  else orderBy = { [sortBy]: order };
  return { where, orderBy };
}

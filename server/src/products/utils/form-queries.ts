import { Prisma } from '@prisma/client';
import { startOfDay, endOfDay } from 'date-fns';
import { FindManyProductsDto } from '../dto';

export function formProductQueries(
  { q, status, price, inStock, from, to, sortBy, order }: FindManyProductsDto,
  slug?: string,
) {
  const where: Prisma.ProductWhereInput = {};

  if (q)
    where.name = {
      contains: q,
      mode: 'insensitive',
    };
  if (status) where.status = status;
  if (slug) where.categories = { some: { slug } };
  if (price) {
    where.price = {};
    if (price[0]) where.price.gte = price[0];
    if (price[1]) where.price.lte = price[1];
  }

  if (inStock) {
    where.inStock = {};
    if (inStock[0]) where.inStock.gte = inStock[0];
    if (inStock[1]) where.inStock.lte = inStock[1];
  }

  let start: Date, end: Date;
  if (from) start = startOfDay(new Date(from));
  if (to) end = endOfDay(new Date(to));

  where.createdAt = {
    gte: start,
    lte: end,
  };

  let orderBy: Prisma.ProductOrderByWithRelationAndSearchRelevanceInput = {};
  if (sortBy === 'orders') orderBy = { orders: { _count: order } };
  else orderBy = { [sortBy]: order };

  return { where, orderBy };
}

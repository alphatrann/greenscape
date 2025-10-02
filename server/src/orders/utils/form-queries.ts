import { Prisma } from '@prisma/client';
import { startOfDay, endOfDay } from 'date-fns';
import { FindManyOrdersDto } from '../dto';

export function formQueries({
  countries,
  from,
  to,
  status,
  shippingCost,
  totalRange,
  sortBy,
  order,
}: FindManyOrdersDto) {
  const where: Prisma.OrderWhereInput = {};
  const orderBy: Prisma.OrderOrderByWithRelationAndSearchRelevanceInput = {};
  if (countries) where.country = { in: countries };
  where.shippingCost = shippingCost;
  if (totalRange) {
    where.total = {};
    if (totalRange[0]) where.total.gte = totalRange[0];
    if (totalRange[1]) where.total.lte = totalRange[1];
  }

  let start: Date, end: Date;
  if (from) start = startOfDay(new Date(from));
  if (to) end = endOfDay(new Date(to));
  where.createdAt = { gte: start, lte: end };

  if (status === 'delivered') where.deliveredAt = { not: null };
  if (status === 'pending') where.deliveredAt = null;
  return { where, orderBy };
}

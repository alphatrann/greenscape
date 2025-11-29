import { Injectable } from '@nestjs/common';
import { CreateOrderDto, FindManyOrdersDto, UpdateOrderDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';
import { formQueries } from './utils';
import { allowedCountries } from '../common/utils';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  create({ bag, ...createOrderDto }: CreateOrderDto) {
    return this.prisma.order.create({
      data: {
        ...createOrderDto,
        products: {
          create: bag,
        },
      },
    });
  }

  async findAll({
    limit = 10,
    offset = 0,
    ...findManyOrdersDto
  }: FindManyOrdersDto) {
    const { where, orderBy } = formQueries(findManyOrdersDto);

    // --- Paginated data
    const orders = await this.prisma.order.findMany({
      take: limit,
      skip: offset,
      where,
      select: {
        id: true,
        total: true,
        phone: true,
        email: true,
        customer: true,
        country: true,
        shippingCost: true,
        tax: true,
        createdAt: true,
        deliveredAt: true,
      },
      orderBy,
    });

    // --- Aggregates (ignoring pagination)
    const count = await this.prisma.order.count({ where });
    const delivered = await this.prisma.order.aggregate({
      _sum: { total: true },
      _count: { _all: true },
      where: { ...where, deliveredAt: { not: null } },
    });

    const pending = await this.prisma.order.aggregate({
      _sum: { total: true },
      _count: { _all: true },
      where: { ...where, deliveredAt: null },
    });

    const shippingGroups = await this.prisma.order.groupBy({
      by: ['shippingCost'],
      _sum: { total: true },
      _count: { _all: true },
      where: { ...where, shippingCost: undefined },
    });

    const countryGroups = await this.prisma.order.groupBy({
      by: ['country'],
      _sum: { total: true },
      _count: { _all: true },
      where: { ...where, country: undefined },
    });

    const sales = await this.prisma.order.aggregate({
      _sum: { total: true },
      _count: { _all: true },
      where,
    });

    const noOrderCountryGroups = allowedCountries
      .filter((c) => !countryGroups.some((g) => g.country === c))
      .map((c) => ({ country: c, _sum: { total: 0 }, _count: { _all: 0 } }));

    return {
      data: orders,
      count,
      sales: sales._sum.total,
      deliveryStatusGroups: {
        delivered: {
          count: delivered._count._all,
          total: delivered._sum.total,
        },
        pending: {
          count: pending._count._all,
          total: pending._sum.total,
        },
      },
      shippingGroups: shippingGroups.map((g) => ({
        shippingCost: g.shippingCost,
        total: g._sum.total,
        count: g._count._all,
      })),
      countryGroups: [...countryGroups, ...noOrderCountryGroups].map((g) => ({
        country: g.country,
        total: g._sum.total,
        count: g._count._all,
      })),
    };
  }

  findOne(id: string) {
    return this.prisma.order.findUnique({
      where: { id },
      include: {
        products: {
          include: {
            product: {
              select: {
                name: true,
                price: true,
              },
            },
          },
        },
      },
    });
  }

  update(id: string, updateOrderDto: UpdateOrderDto) {
    return this.prisma.order.update({ where: { id }, data: updateOrderDto });
  }
}

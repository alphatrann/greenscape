import { Injectable } from '@nestjs/common';
import { CreateOrderDto, FindManyOrdersDto, UpdateOrderDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';
import { formQueries } from './utils';

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
    const orders = await this.prisma.order.findMany({
      take: limit,
      skip: offset,
      where,
      orderBy,
    });
    const count = await this.prisma.order.count({ where });

    return {
      data: orders,
      count,
    };
  }

  async aggregate(
    field: 'deliveredAt' | 'country' | 'shippingCost',
    findManyOrdersDto: FindManyOrdersDto,
  ) {
    const { where } = formQueries(findManyOrdersDto);
    delete where[field];
    return this.prisma.order.groupBy({
      by: field,
      _count: { id: true },
      where,
    });
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

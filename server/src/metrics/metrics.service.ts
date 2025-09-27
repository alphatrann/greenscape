import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  parseISO,
  differenceInDays,
  subDays,
  endOfDay,
  startOfDay,
} from 'date-fns';

@Injectable()
export class MetricsService {
  constructor(private prisma: PrismaService) {}

  async getPeriodKeyStats(startDateStr: string, endDateStr: string) {
    const startDate = startOfDay(parseISO(startDateStr));
    const endDate = endOfDay(parseISO(endDateStr));

    const daysInPeriod = differenceInDays(endDate, startDate) + 1;

    const lastEndDate = subDays(startDate, 1);
    const lastStartDate = subDays(lastEndDate, daysInPeriod - 1);

    const [thisSales, thisAvgOrderValue] = await this.getSalesAndAvgOrderValue(
      startDate,
      endDate,
    );
    const thisUnitsSold = await this.getUnitsSold(startDate, endDate);
    const thisCustomers = await this.getCustomers(startDate, endDate);

    const [lastSales, lastAvgOrderValue] = await this.getSalesAndAvgOrderValue(
      lastStartDate,
      lastEndDate,
    );
    const lastUnitsSold = await this.getUnitsSold(lastStartDate, lastEndDate);
    const lastCustomers = await this.getCustomers(lastStartDate, lastEndDate);

    return {
      thisSales,
      lastSales,
      thisAvgOrderValue,
      lastAvgOrderValue,
      thisUnitsSold,
      lastUnitsSold,
      thisCustomers,
      lastCustomers,
    };
  }

  private async getSalesAndAvgOrderValue(startDate: Date, endDate: Date) {
    const {
      _sum: { total: revenue },
      _avg: { total: avgOrderValue },
    } = await this.prisma.order.aggregate({
      _sum: { total: true },
      _avg: { total: true },
      where: { createdAt: { gte: startDate, lte: endDate } },
    });

    return [+revenue || 0, +avgOrderValue || 0];
  }

  private async getUnitsSold(startDate: Date, endDate: Date) {
    const {
      _sum: { qty: unitsSold },
    } = await this.prisma.ordersOnProducts.aggregate({
      _sum: { qty: true },
      where: {
        order: { createdAt: { gte: startDate, lte: endDate } },
      },
    });

    return +unitsSold || 0;
  }

  private async getCustomers(startDate: Date, endDate: Date) {
    const [{ count }] = await this.prisma.$queryRaw<[{ count: BigInt }]>`
    SELECT COUNT(DISTINCT "customer")
    FROM "Order" o
    WHERE o."createdAt" >= ${startDate} AND o."createdAt" <= ${endDate};
  `;

    return Number(count) || 0;
  }

  async getMonthsSalesInYear(year: number) {
    // Get the first order date to determine earliest year
    const {
      _min: { createdAt: firstOrderAt },
    } = await this.prisma.order.aggregate({
      _min: { createdAt: true },
    });

    // Group by createdAt (raw) and shippingCost
    const revenues = await this.prisma.order.groupBy({
      by: ['createdAt', 'shippingCost'],
      _sum: { total: true },
      where: {
        createdAt: {
          gte: new Date(`${year}-01-01`),
          lt: new Date(`${year + 1}-01-01`),
        },
      },
    });

    // Transform into { month, shippingCost, total }
    const monthlySales = revenues.map(({ createdAt, shippingCost, _sum }) => ({
      month: createdAt.getMonth() + 1, // 1-12 instead of 0-11
      shippingCost,
      total: _sum.total ?? 0,
    }));

    const startYear = firstOrderAt
      ? new Date(firstOrderAt).getFullYear()
      : new Date().getFullYear();

    return {
      startYear,
      monthlySales,
    };
  }

  async groupSalesByCountries(startDateStr: string, endDateStr: string) {
    const startDate = parseISO(startDateStr);
    const endDate = parseISO(endDateStr);
    const countrySaleGroups = await this.prisma.order.groupBy({
      by: ['country'],
      _sum: { total: true },
      where: {
        createdAt: {
          gte: startOfDay(startDate),
          lte: endOfDay(endDate),
        },
      },
    });

    return countrySaleGroups.map((group) => ({
      country: group.country,
      sales: group._sum.total ?? 0,
    }));
  }
}

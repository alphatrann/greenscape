import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { endOfDay, startOfMonth, subMonths } from 'date-fns';

@Injectable()
export class StatsService {
  constructor(private prisma: PrismaService) {}

  async getMonthKeyStats() {
    const firstDayOfCurMonth = startOfMonth(new Date());
    const endOfCurDay = endOfDay(new Date());
    const firstDayOfPrevMonth = startOfMonth(subMonths(firstDayOfCurMonth, 1));
    const endOfPrevDay = subMonths(endOfCurDay, 1);

    const {
      _sum: { total: curMonthSales },
      _avg: { total: curMonthAvgOrder },
    } = await this.prisma.order.aggregate({
      _sum: { total: true },
      _avg: { total: true },
      where: { createdAt: { gte: firstDayOfCurMonth, lte: endOfCurDay } },
    });

    const {
      _sum: { total: prevMonthSales },
      _avg: { total: prevMonthAvgOrder },
    } = await this.prisma.order.aggregate({
      _sum: { total: true },
      _avg: { total: true },
      where: { createdAt: { gte: firstDayOfPrevMonth, lte: endOfPrevDay } },
    });

    const {
      _sum: { qty: curMonthProductSales = 0 },
    } = await this.prisma.ordersOnProducts.aggregate({
      _sum: { qty: true },
      where: {
        order: { createdAt: { gte: firstDayOfCurMonth, lte: endOfCurDay } },
      },
    });

    const {
      _sum: { qty: prevMonthProductSales = 0 },
    } = await this.prisma.ordersOnProducts.aggregate({
      _sum: { qty: true },
      where: {
        order: { createdAt: { gte: firstDayOfPrevMonth, lte: endOfPrevDay } },
      },
    });

    return {
      curMonthSales: curMonthSales ?? 0,
      curMonthAvgOrder: curMonthAvgOrder ?? 0,
      prevMonthAvgOrder: prevMonthAvgOrder ?? 0,
      prevMonthProductSales: prevMonthProductSales ?? 0,
      prevMonthSales: prevMonthSales ?? 0,
      curMonthProductSales: curMonthProductSales ?? 0,
    };
  }

  async getMonthlySales(year: number) {
    const {
      _min: { createdAt: firstOrderAt },
      _max: { createdAt: lastOrderAt },
    } = await this.prisma.order.aggregate({
      _min: { createdAt: true },
      _max: { createdAt: true },
    });

    const monthlySales = await this.prisma.order.groupBy({
      by: ['createdAt'],
      _sum: { total: true },
      where: {
        createdAt: {
          gte: new Date(`1-1-${year}`),
          lt: new Date(`1-1-${year + 1}`),
        },
      },
    });

    const startYear = new Date(firstOrderAt).getTime()
      ? new Date(firstOrderAt).getFullYear()
      : new Date().getFullYear();
    const endYear = new Date(lastOrderAt).getTime()
      ? new Date(lastOrderAt).getFullYear()
      : new Date().getFullYear();

    return {
      startYear,
      endYear,
      monthlySales: monthlySales.map(({ _sum, ...group }) => ({
        total: _sum.total || 0,
        ...group,
      })),
    };
  }

  async groupSalesByCountries() {
    const countrySaleGroups = await this.prisma.order.groupBy({
      by: ['country'],
      _sum: { total: true },
    });

    return countrySaleGroups.map((group) => ({
      country: group.country,
      _sum: group._sum.total ?? 0,
    }));
  }
}

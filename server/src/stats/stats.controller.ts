import {
  BadRequestException,
  Controller,
  Get,
  ParseIntPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { StatsService } from './stats.service';
import { isValid } from 'date-fns';
import { RolesGuard } from '../auth/guards';
import { Role } from '@prisma/client';

@Controller('stats')
@UseGuards(RolesGuard(Role.Admin))
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @Get('key')
  async getMonthKeyStats() {
    const stats = await this.statsService.getMonthKeyStats();
    return { data: stats, success: true };
  }

  @Get('yr-revenues')
  async getMonthlySales(@Query('year', ParseIntPipe) year?: number) {
    const stats = await this.statsService.getMonthlySales(
      year || new Date().getFullYear(),
    );
    return { data: stats, success: true };
  }

  @Get('countries')
  async getSalesByCountries() {
    const countrySaleGroups = await this.statsService.groupSalesByCountries();
    return { data: countrySaleGroups, success: true };
  }
}

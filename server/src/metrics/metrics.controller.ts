import {
  BadRequestException,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { MetricsService } from './metrics.service';
import { RolesGuard } from '../auth/guards';
import { Role } from '@prisma/client';
import { QueryByPeriodDto } from './dto';

@Controller('stats')
@UseGuards(RolesGuard(Role.Admin))
export class MetricsController {
  constructor(private readonly metricsService: MetricsService) {}

  @Get('key')
  async getPeriodKeyStats(@Query() dto: QueryByPeriodDto) {
    const stats = await this.metricsService.getPeriodKeyStats(
      dto.start,
      dto.end,
    );
    return { data: stats, success: true };
  }

  @Get('year/:year')
  async getMonthlySales(@Param('year', ParseIntPipe) year: number) {
    const stats = await this.metricsService.getMonthsSalesInYear(
      year || new Date().getFullYear(),
    );
    return { data: stats, success: true };
  }

  @Get('countries')
  async getSalesByCountries(@Query() dto: QueryByPeriodDto) {
    const countrySaleGroups = await this.metricsService.groupSalesByCountries(
      dto.start,
      dto.end,
    );
    return { data: countrySaleGroups, success: true };
  }
}

import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Query,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { FindManyOrdersDto, UpdateOrderDto } from './dto';
import { RolesGuard } from '../auth/guards';
import { Role } from '@prisma/client';
import { format } from 'date-fns';

@Controller('orders')
@UseGuards(RolesGuard(Role.Admin))
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  async findAll(@Query() findManyOrdersDto: FindManyOrdersDto) {
    const response = await this.ordersService.findAll(findManyOrdersDto);
    return { ...response, success: true };
  }

  @Get('details/:id')
  async findOne(@Param('id') id: string) {
    const order = await this.ordersService.findOne(id);
    return { data: order, success: true };
  }

  @Patch(':id')
  async updateStatus(
    @Param('id') id: string,
    @Body() { deliveredAt }: UpdateOrderDto,
  ) {
    const previousOrder = await this.ordersService.findOne(id);
    if (previousOrder.deliveredAt)
      throw new BadRequestException(
        `Order has already been delivered at ${format(
          previousOrder.deliveredAt,
          'Pp',
        )}`,
      );
    const deliveredOrder = await this.ordersService.update(id, { deliveredAt });
    return { data: deliveredOrder, success: true };
  }
}

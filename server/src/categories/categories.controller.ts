import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
  Query,
  Get,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto, UpdateCategoryDto } from './dto';
import { RolesGuard } from '../auth/guards';
import { Role } from '@prisma/client';
import { DeleteManyDto } from '../common/dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @UseGuards(RolesGuard(Role.Admin))
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    const newCategory = await this.categoriesService.create(createCategoryDto);
    return {
      success: true,
      data: newCategory,
    };
  }

  @Get('tree')
  async findCategoriesTree() {
    const categories = await this.categoriesService.getCategoryTree();
    return { success: true, data: categories };
  }

  @Patch(':id')
  @UseGuards(RolesGuard(Role.Admin))
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    const updatedCategory = await this.categoriesService.update(
      id,
      updateCategoryDto,
    );
    return {
      success: true,
      data: updatedCategory,
    };
  }

  @Delete()
  @UseGuards(RolesGuard(Role.Admin))
  async remove(@Query() { ids }: DeleteManyDto) {
    await this.categoriesService.remove(ids);
    return { success: true };
  }
}

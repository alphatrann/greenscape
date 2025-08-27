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
import { DeleteManyDto, FindManyDto } from '../common/dto';
import { FindManyProductsDto } from '../products/dto';

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

  @Get('subs')
  async findRootCategories(@Query() findManyDto: FindManyDto) {
    const categories = await this.categoriesService.findAll(findManyDto);
    const count = await this.categoriesService.paginate(findManyDto);
    return { success: true, data: { categories, parents: null }, count };
  }

  @Get(':slug/subs')
  async findBySlug(
    @Query() findManyDto: FindManyDto,
    @Param('slug') slug: string,
  ) {
    const categories = await this.categoriesService.findAll(findManyDto, slug);
    const parents = await this.categoriesService.findParentsBySlug(slug);
    const count = await this.categoriesService.paginate(findManyDto, slug);
    return { success: true, count, data: { categories, parents } };
  }

  @Get('tree')
  async findCategoriesTree(@Query() findManyProductsDto: FindManyProductsDto) {
    const categories = await this.categoriesService.findCategoriesTree(
      findManyProductsDto,
    );
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

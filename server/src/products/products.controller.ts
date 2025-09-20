import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  UseGuards,
  UploadedFiles,
  UseInterceptors,
  ParseFilePipe,
  BadRequestException,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import {
  CreateProductDto,
  DeleteImagesDto,
  FindManyProductsDto,
  FindManyStoreProductsDto,
  FindRelatedProductsDto,
  UpdateProductDto,
} from './dto';
import { DeleteManyDto } from '../common/dto';
import { Role, Status } from '@prisma/client';
import { RolesGuard } from '../auth/guards';
import { imageValidators } from '../files/validators';
import { LocalFilesInterceptor } from '../files/interceptors/local-files.interceptor';
import { MAX_IMAGE_SIZE, MAX_PRODUCT_IMAGES_COUNT } from '../common/constants';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @UseGuards(RolesGuard(Role.Admin))
  async create(@Body() createProductDto: CreateProductDto) {
    const newProduct = await this.productsService.create(createProductDto);
    return { success: true, data: newProduct };
  }

  @Get()
  @UseGuards(RolesGuard(Role.Admin))
  async findAll(@Query() findManyProductsDto: FindManyProductsDto) {
    const products = await this.productsService.findAll(findManyProductsDto);
    const statusGroups = await this.productsService.aggregateStatus(
      findManyProductsDto,
    );
    return {
      success: true,
      data: products,
      statusGroups,
    };
  }

  @Get('category/:slug')
  @UseGuards(RolesGuard(Role.Admin))
  async findAllBySlug(
    @Query() findManyProductsDto: FindManyProductsDto,
    @Param('slug') slug: string,
  ) {
    const products = await this.productsService.findAll(
      findManyProductsDto,
      slug,
    );
    const statusGroups = await this.productsService.aggregateStatus(
      findManyProductsDto,
      slug,
    );
    return { success: true, data: products, statusGroups };
  }

  @Get('store')
  async findAllInStore(@Query() dto: FindManyStoreProductsDto) {
    const products = await this.productsService.findAll({
      ...dto,
      status: Status.Active,
    });

    return {
      success: true,
      data: products,
    };
  }

  @Get('store/paginate')
  async paginateStore(@Query() dto: FindManyStoreProductsDto) {
    const count = await this.productsService.paginate({
      ...dto,
      status: Status.Active,
    });
    return { success: true, count };
  }

  @Get('store/paginate/category/:slug')
  async paginateStoreByCategorySlug(
    @Query() dto: FindManyStoreProductsDto,
    @Param('slug') slug: string,
  ) {
    const count = await this.productsService.paginate(
      { ...dto, status: Status.Active },
      slug,
    );
    return { success: true, count };
  }

  @Get('paginate')
  @UseGuards(RolesGuard(Role.Admin))
  async paginate(@Query() dto: FindManyProductsDto) {
    const count = await this.productsService.paginate(dto);
    return { success: true, data: count };
  }

  @Get('paginate/category/:slug')
  @UseGuards(RolesGuard(Role.Admin))
  async paginateByCategorySlug(
    @Query() dto: FindManyProductsDto,
    @Param('slug') slug: string,
  ) {
    const count = await this.productsService.paginate(dto, slug);
    return { success: true, data: count };
  }

  @Get('recommend')
  async recommend(@Query() { refIds }: FindRelatedProductsDto) {
    const recommendedProducts = await this.productsService.recommend(refIds);
    return { success: true, data: recommendedProducts };
  }

  @Get('store/category/:slug')
  async findAllBySlugInStore(
    @Query() dto: FindManyStoreProductsDto,
    @Param('slug') slug: string,
  ) {
    const products = await this.productsService.findAll(
      { ...dto, status: Status.Active },
      slug,
    );
    return { success: true, data: products };
  }

  @Get('details/:slug')
  async findOne(@Param('slug') slug: string) {
    const product = await this.productsService.findBySlug(slug);
    return { success: true, data: product };
  }

  @Patch(':id/upload-images')
  @UseGuards(RolesGuard(Role.Admin))
  // to upload file to aws, uncomment this interceptor and comment the interceptor below
  // @UseInterceptors(FilesInterceptor('images', 4))
  // for local use, uncomment this interceptor and comment the interceptor above
  @UseInterceptors(
    LocalFilesInterceptor({
      maxFilesCount: MAX_PRODUCT_IMAGES_COUNT,
      fieldName: 'images',
      path: '/products',
      fileFilter: (_request, file, callback) => {
        if (!file.mimetype.includes('image')) {
          return callback(
            new BadRequestException('Provide a valid image'),
            false,
          );
        }
        callback(null, true);
      },
      limits: {
        fileSize: MAX_IMAGE_SIZE, // 10MB
      },
    }),
  )
  async uploadImages(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFiles(
      new ParseFilePipe({
        validators: imageValidators,
      }),
    )
    files: Express.Multer.File[],
  ) {
    await this.productsService.uploadProductImages(
      id,
      files.map((file) => ({
        buffer: file.buffer,
        filename: file.originalname,
        mimetype: file.mimetype,
        path: file.path,
      })),
    );
    return { success: true };
  }

  @Delete(':productId/remove-images')
  @UseGuards(RolesGuard(Role.Admin))
  async removeImage(
    @Param('productId', ParseIntPipe) productId: number,
    @Query() { ids: imageIds }: DeleteImagesDto,
  ) {
    await this.productsService.removeImages(productId, imageIds);
    return { success: true };
  }

  @Patch(':id')
  @UseGuards(RolesGuard(Role.Admin))
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    const updatedProduct = await this.productsService.update(
      id,
      updateProductDto,
    );
    return { success: true, data: updatedProduct };
  }

  @Delete()
  @UseGuards(RolesGuard(Role.Admin))
  async remove(@Query() { ids }: DeleteManyDto) {
    await this.productsService.remove(ids);
    return { success: true };
  }
}

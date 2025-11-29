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
  FindCartProductsDto,
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
    const { count, products } = await this.productsService.findAll(
      findManyProductsDto,
    );
    const statusGroups = await this.productsService.aggregateStatus(
      findManyProductsDto,
    );
    const categoryGroups = await this.productsService.aggregateCategories(
      findManyProductsDto,
    );
    return {
      success: true,
      count,
      data: products,
      statusGroups,
      categoryGroups,
    };
  }

  @Get('category/:slug')
  @UseGuards(RolesGuard(Role.Admin))
  async findAllBySlug(
    @Query() findManyProductsDto: FindManyProductsDto,
    @Param('slug') slug: string,
  ) {
    const { count, products } = await this.productsService.findAll(
      findManyProductsDto,
      slug,
    );
    const statusGroups = await this.productsService.aggregateStatus(
      findManyProductsDto,
      slug,
    );
    const categoryGroups = await this.productsService.aggregateCategories(
      findManyProductsDto,
    );
    return {
      success: true,
      count,
      data: products,
      statusGroups,
      categoryGroups,
    };
  }

  @Get('cart')
  async findCartProducts(@Query() { ids }: FindCartProductsDto) {
    const cartProducts = await this.productsService.findCartProducts(ids);
    return { success: true, data: cartProducts };
  }

  @Get('store')
  async findAllInStore(
    @Query() { limit = 10, offset = 0, ...dto }: FindManyStoreProductsDto,
  ) {
    const { count, products } = await this.productsService.findAll({
      ...dto,
      limit,
      offset,
      status: Status.Active,
    });

    return {
      success: true,
      count,
      data: products,
    };
  }

  @Get('recommend')
  async recommend(@Query() { refIds }: FindRelatedProductsDto) {
    const recommendedProducts = await this.productsService.recommend(refIds);
    return { success: true, data: recommendedProducts };
  }

  @Get('store/category/:slug')
  async findAllBySlugInStore(
    @Query() { limit = 10, offset = 0, ...dto }: FindManyStoreProductsDto,
    @Param('slug') slug: string,
  ) {
    const { count, products } = await this.productsService.findAll(
      { ...dto, status: Status.Active },
      slug,
    );
    return { success: true, count, data: products };
  }

  @UseGuards(RolesGuard(Role.Admin))
  @Get('details/:slug')
  async findOneAdmin(@Param('slug') slug: string) {
    const product = await this.productsService.findBySlug(slug, {
      admin: true,
    });
    return { success: true, data: product };
  }

  @Get('store/details/:slug')
  async findOne(@Param('slug') slug: string) {
    const product = await this.productsService.findBySlug(slug, {
      admin: false,
    });
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
    const ids = await this.productsService.uploadProductImages(
      id,
      files.map((file) => ({
        buffer: file.buffer,
        filename: file.originalname,
        mimetype: file.mimetype,
        path: file.path,
      })),
    );
    return { success: true, ids };
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

import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Prisma, Status } from '@prisma/client';
import { UploadFileDto } from '../files/dto';
import { PrismaError } from '../prisma/prisma-error';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto, FindManyProductsDto, UpdateProductDto } from './dto';
import { LocalFilesService } from '../files/local-files.service';
import { formProductQueries } from './utils';

@Injectable()
export class ProductsService {
  constructor(
    private prisma: PrismaService,
    private filesService: LocalFilesService,
  ) {}

  async create({ categoryIds, ...dto }: CreateProductDto) {
    try {
      const newProduct = await this.prisma.product.create({
        data: {
          ...dto,
          categories: {
            connect: categoryIds.map((id) => ({ id })),
          },
        },
      });
      return newProduct;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === PrismaError.UniqueViolation)
          throw new BadRequestException({
            success: false,
            message: 'Product with the given slug already exists',
          });
        if (error.code === PrismaError.RecordNotFound)
          throw new BadRequestException({
            success: false,
            message:
              'Cannot create product because of unknown category provided',
          });
      }
      throw new InternalServerErrorException({
        success: false,
        message: 'Internal Server Error',
      });
    }
  }

  async uploadProductImages(
    productId: number,
    imagesUploadDto: UploadFileDto[],
  ) {
    try {
      const keys = await this.filesService.createMany(imagesUploadDto);
      await this.prisma.image.createMany({
        data: keys.map((key) => ({ fileId: key, productId })),
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === PrismaError.RecordNotFound) {
          throw new NotFoundException('Product not found');
        }
        if (error.code === PrismaError.ForeignViolation) {
          throw new BadRequestException({
            success: false,
            message: 'Some files are not found',
          });
        }
      }
      throw new InternalServerErrorException({
        success: false,
        message: 'Internal Server Error',
      });
    }
  }

  async findOne(id: number) {
    const product = await this.prisma.product.findUnique({ where: { id } });
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async recommend(refIds: number[]) {
    const [{ categories }] = await this.prisma.product.findMany({
      where: { id: { in: refIds } },
      select: { categories: { select: { id: true } } },
    });
    const recommendedProducts = await this.prisma.product.findMany({
      take: 8,
      orderBy: { orders: { _count: 'desc' } },
      where: {
        inStock: { gt: 0 },
        id: { notIn: refIds },
        categories: {
          every: { id: { in: categories.map((c) => c.id) } },
        },
        status: Status.Active,
      },
      select: {
        id: true,
        name: true,
        slug: true,
        images: {
          select: { file: { select: { id: true, url: true } } },
          take: 1,
        },
        price: true,
      },
    });
    return recommendedProducts;
  }

  async paginate(
    dto: Omit<FindManyProductsDto, 'limit' | 'offset' | 'sortBy' | 'order'>,
    slug: string = '',
  ) {
    const { where } = formProductQueries(dto, slug);
    return this.prisma.product.count({ where });
  }

  async findCartProducts(ids: number[]) {
    if (ids.length === 0) return [];
    const products = await this.prisma.product.findMany({
      where: { id: { in: ids } },
      select: {
        id: true,
        slug: true,
        name: true,
        inStock: true,
        price: true,
        images: {
          select: { file: { select: { id: true, url: true } } },
          take: 1,
        },
      },
    });
    return products;
  }

  async findAll(
    { limit = 10, offset = 0, ...dto }: FindManyProductsDto,
    slug?: string,
  ) {
    try {
      const { where, orderBy } = formProductQueries(dto, slug);
      const products = await this.prisma.product.findMany({
        take: limit,
        skip: offset,
        orderBy,
        where,
        select: {
          id: true,
          slug: true,
          name: true,
          inStock: true,
          price: true,
          categories: { select: { id: true, slug: true } },
          createdAt: true,
          status: true,
          images: {
            select: { file: { select: { id: true, url: true } } },
            take: 1,
          },
          _count: { select: { orders: true } },
        },
      });

      return products;
    } catch (error) {
      throw new InternalServerErrorException({
        success: false,
        message: 'Internal Server Error',
      });
    }
  }

  async aggregateStatus(dto: FindManyProductsDto, slug: string = null) {
    const { where } = formProductQueries(dto, slug);
    delete where['status'];
    const groups = await this.prisma.product.groupBy({
      by: 'status',
      _count: { id: true },
      where,
    });
    return groups.map((g) => ({
      count: g._count.id,
      status: g.status,
    }));
  }

  async findBySlug(slug: string) {
    const product = await this.prisma.product.findUnique({
      where: { slug },
      include: {
        categories: true,
        images: {
          select: { file: { select: { id: true, url: true } } },
        },
      },
    });
    if (!product)
      throw new NotFoundException({
        success: false,
        message: 'Product not found',
      });
    return product;
  }

  async update(id: number, { categoryIds, ...dto }: UpdateProductDto) {
    try {
      const { categories } = await this.prisma.product.findUnique({
        where: { id },
        select: { categories: true },
      });
      const updatedCategoryIdsSet = new Set(categoryIds);
      const currentCategoryIdsSet = new Set(categories.map((c) => c.id));
      const updatedProduct = await this.prisma.product.update({
        where: { id },
        data: {
          ...dto,
          categories: {
            disconnect: categories
              .filter((c) => !updatedCategoryIdsSet.has(c.id))
              .map(({ id }) => ({ id })),
            connect: categoryIds
              .filter((id) => !currentCategoryIdsSet.has(id))
              .map((id) => ({ id })),
          },
        },
      });
      return updatedProduct;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === PrismaError.UniqueViolation)
          throw new BadRequestException({
            success: false,
            message: 'Product with the given name already exists',
          });
        if (error.code === PrismaError.RecordNotFound)
          throw new BadRequestException({
            success: false,
            message:
              'Cannot create product because either it is not found or category provided is unknown',
          });
      }
      throw new InternalServerErrorException({
        success: false,
        message: 'Internal Server Error',
      });
    }
  }

  async removeImages(productId: number, imageIds: string[]) {
    const product = await this.prisma.product.findUnique({
      where: { id: productId },
      select: {
        images: { select: { file: { select: { id: true } } } },
      },
    });
    const productImageIds = product.images.map((img) => img.file.id);
    if (imageIds.some((id) => !productImageIds.includes(id)))
      throw new NotFoundException({
        success: false,
        message: 'Cannot delete images because some of which are not found',
      });
    if (imageIds.length === product.images.length)
      throw new ForbiddenException({
        success: false,
        message: 'Cannot delete all images of the product',
      });
    await this.filesService.remove(imageIds);
  }

  async remove(ids: number[]) {
    try {
      const productsWithImagesOnly = await this.prisma.product.findMany({
        where: { id: { in: ids } },
        select: { images: { select: { fileId: true } } },
      });
      if (productsWithImagesOnly.length !== ids.length)
        throw new NotFoundException({
          success: false,
          message: `${
            ids.length - productsWithImagesOnly.length
          } products were not deleted because they were not found`,
        });
      const imageKeys = productsWithImagesOnly.flatMap((img) =>
        img.images.map((image) => image.fileId),
      );
      await this.filesService.remove(imageKeys);
      await this.prisma.product.deleteMany({
        where: { id: { in: ids } },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError)
        if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException({
        success: false,
        message: 'Internal Server Error',
      });
    }
  }
}

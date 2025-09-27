import * as Joi from '@hapi/joi';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { CategoriesModule } from './categories/categories.module';
import { FilesModule } from './files/files.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { CheckoutModule } from './checkout/checkout.module';
import { OrdersModule } from './orders/orders.module';
import { MetricsModule } from './metrics/metrics.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        DATABASE_URL: Joi.string().required(),
        SESSION_SECRET: Joi.string().required(),

        CORS_ORIGIN_ADMIN: Joi.string().required(),
        CORS_ORIGIN_STORE: Joi.string().required(),
        CORS_DESKTOP_ORIGIN: Joi.string().required(),

        REDIS_URL: Joi.string().required(),
        STRIPE_SECRET_KEY: Joi.string().required(),
        STRIPE_WEBHOOK_SECRET: Joi.string().required(),

        // if upload files to S3
        AWS_BUCKET_NAME: Joi.string(),
        AWS_OBJECT_DEST: Joi.string(),

        COOKIE_DOMAIN: Joi.string(),
        UPLOADED_FILES_DEST: Joi.string(), // if upload files locally
      }),
    }),
    CategoriesModule,
    FilesModule,
    ProductsModule,
    CheckoutModule,
    OrdersModule,
    MetricsModule,
  ],
})
export class AppModule {}

import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { rawBodyMiddleware } from './common/middlewares';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);
  app.use(rawBodyMiddleware());
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  app.enableCors({
    origin: [
      configService.get('CORS_ORIGIN_ADMIN'),
      configService.get('CORS_ORIGIN_STORE'),
      configService.get('CORS_DESKTOP_ORIGIN'),
    ],
    credentials: true,
  });

  app.set('trust proxy', 1);

  await app.listen(5000);
}
bootstrap();

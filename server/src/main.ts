import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as session from 'express-session';
import * as passport from 'passport';
import { createClient } from 'redis';
import RedisStore from 'connect-redis';
import { ConfigService } from '@nestjs/config';
import { rawBodyMiddleware } from './common/middlewares';
import { NestExpressApplication } from '@nestjs/platform-express';

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

  const redisClient = createClient({
    url: configService.get('REDIS_URL'),
  });
  await redisClient.connect();

  app.use(
    session({
      store: new RedisStore({ client: redisClient }),
      secret: configService.get('SESSION_SECRET'),
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        sameSite: 'lax',
        secure: configService.get('NODE_ENV') === 'production',
        maxAge: 1000 * 60 * 60 * 24 * 7,
        domain: configService.get('COOKIE_DOMAIN'),
      },
    }),
  );

  app.set('trust proxy', 1);

  app.use(passport.initialize());
  app.use(passport.session());
  await app.listen(5000);
}
bootstrap();

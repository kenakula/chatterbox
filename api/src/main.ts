import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { ConfigKey } from '@common/configs';
import { AllExceptionsFilter } from '@common/filters';
import { LoggerInterceptor, ResponseInterceptor } from '@common/interceptors';
import { LoggerService } from '@common/logger';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  const adapterHost = app.get(HttpAdapterHost);

  app.use(cookieParser());
  app.enableCors({
    origin: ['http://localhost:5173'],
    credentials: true,
  });
  app.setGlobalPrefix('api');
  app.useLogger(new LoggerService());
  app.useGlobalInterceptors(new LoggerInterceptor(new LoggerService()));
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(new AllExceptionsFilter(adapterHost));
  app.useGlobalPipes(new ValidationPipe());
  app.use(compression());
  app.use(helmet());

  const config = app.get(ConfigService);
  const port = config.get(`${ConfigKey.App}.port`);
  await app.listen(port, () => {
    console.log('------------ 🚀🚀🚀 ------------');
    console.log('--------------------------------');
    console.log('listening on port:', port);
    console.log('--------------------------------');
    console.log('------------ 🚀🚀🚀 ------------');
  });
}

bootstrap();

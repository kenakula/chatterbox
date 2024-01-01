import { INestApplication } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { LoggerService } from '@common/logger';
import * as request from 'supertest';

import { AppModule } from '@app/app.module';

import { LoggerInterceptor } from './logger.interceptor';

jest.mock('../../logger/logger.service');

describe('LoggerInterceptor', () => {
  let app: INestApplication;
  let logger: LoggerService;

  afterAll(async () => {
    await app.close();
  });

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule, ConfigModule.forRoot({ envFilePath: '../.env' })],
    }).compile();

    app = module.createNestApplication();
    logger = app.get<LoggerService>(LoggerService);
    app.useGlobalInterceptors(new LoggerInterceptor(logger));
    await app.init();
  });

  it('should be defined', () => {
    expect(new LoggerInterceptor(new LoggerService())).toBeDefined();
  });

  it('should call logger on requests', async () => {
    await request(app.getHttpServer()).get('/users').send();
    expect(logger.log).toHaveBeenCalled();
  });
});

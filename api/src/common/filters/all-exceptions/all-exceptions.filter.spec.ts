import { INestApplication } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpAdapterHost } from '@nestjs/core';
import { Test } from '@nestjs/testing';
import { LoggerService } from '@common/logger';
import * as request from 'supertest';

import { AppModule } from '@app/app.module';

import { AllExceptionsFilter } from './all-exceptions.filter';

jest.mock('../../logger/logger.service');

const RESPONSE_KEYS = ['method', 'statusCode', 'path', 'timestamp', 'message'];

describe('ExceptionsFilter', () => {
  let app: INestApplication;
  let adapterHost: HttpAdapterHost;
  let exceptionsFilter: AllExceptionsFilter;
  let logger: LoggerService;

  afterAll(async () => {
    await app.close();
  });

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule, ConfigModule.forRoot({ envFilePath: '../.env' })],
    }).compile();

    app = module.createNestApplication();
    adapterHost = app.get(HttpAdapterHost);
    logger = app.get<LoggerService>(LoggerService);
    exceptionsFilter = new AllExceptionsFilter(adapterHost);
    app.useGlobalFilters(exceptionsFilter);
    await app.init();
  });

  it('should be defined', () => {
    expect(new AllExceptionsFilter(adapterHost)).toBeDefined();
  });

  it('should throw exception with defined structure', async () => {
    const result = await request(app.getHttpServer()).get('/unknown-route').send();
    const data = JSON.parse(result.text);

    for (const key of RESPONSE_KEYS) {
      expect(key in data).toBeTruthy();
    }
  });

  it('should have message with correct error type', async () => {
    const result = await request(app.getHttpServer()).get('/unknown-route').send();
    const data = JSON.parse(result.text);

    expect(data.message).toBe('Cannot GET /unknown-route');
  });

  it('should call logger', async () => {
    await request(app.getHttpServer()).get('/unknown-route').send();

    expect(logger.error).toHaveBeenCalled();
  });
});

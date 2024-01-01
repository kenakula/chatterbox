import { INestApplication } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';

import { AppModule } from '../../../app.module';

import { ResponseInterceptor } from './response.interceptor';

const RESPONSE_KEYS = ['isArray', 'data', 'method', 'duration', 'statusCode', 'path'];

describe('ResponseInterceptor', () => {
  let app: INestApplication;

  afterAll(async () => {
    await app.close();
  });

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule, ConfigModule.forRoot({ envFilePath: '../.env' })],
    }).compile();

    app = module.createNestApplication();
    app.useGlobalInterceptors(new ResponseInterceptor());
    await app.init();
  });

  it('should be defined', () => {
    expect(new ResponseInterceptor()).toBeDefined();
  });

  it('should have response with defined structure', async () => {
    const responseData = await request(app.getHttpServer()).get('/users').send();
    const data = JSON.parse(responseData.text);

    for (const key of RESPONSE_KEYS) {
      expect(key in data).toBeTruthy();
    }
  });
});

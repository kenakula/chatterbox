import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { LoggerService } from '@common/logger';
import { IExceptionResponse } from '@domain/responses';
import { Request } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new LoggerService();

  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  // TODO сузить эксепшн, сделать отдельный для http
  catch(exception: unknown, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const responseBody: IExceptionResponse = {
      statusCode: httpStatus,
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
      method: request.method,
      message: exception.toString(),
    };

    this.logger.error(exception.toString(), 'AllExceptionsFilter');

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}

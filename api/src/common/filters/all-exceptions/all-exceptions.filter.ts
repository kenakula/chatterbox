import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { LoggerService } from '@common/logger';
import { Request } from 'express';

import { IExceptionResponse } from '@app/core/responses';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new LoggerService();

  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message = exception instanceof HttpException
      ? this.getExceptionResponseMessage(exception.getResponse())
      : exception.toString();

    const responseBody: IExceptionResponse = {
      statusCode: httpStatus,
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
      method: request.method,
      message,
    };

    this.logger.error(exception.toString(), 'AllExceptionsFilter');

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }

  private getExceptionResponseMessage(response: object | string): string {
    if (typeof response === 'object' && 'message' in response) {
      const message = response.message as string[];

      return message.toString();
    }

    return response.toString();
  }
}

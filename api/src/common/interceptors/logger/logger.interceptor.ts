import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { LoggerService } from '@common/logger';
import { Request, Response } from 'express';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  constructor(private readonly logger: LoggerService) {
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<void> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    const { method, originalUrl } = request;

    const now = Date.now();
    const module = context.getClass().name ?? 'ChatterBox';
    const ip =
      request.headers['x-forwarded-for'] || request.socket.remoteAddress;

    return next.handle().pipe(tap(() => {
      this.logger.log(
        `[${method}]: ${response.statusCode} {${originalUrl}} [${Date.now() - now}ms] | ip=${ip}`,
        module,
      );
    }));
  }
}

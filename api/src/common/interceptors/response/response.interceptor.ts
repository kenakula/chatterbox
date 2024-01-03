import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { ICommonResponse } from '@domain/responses';
import { map, Observable } from 'rxjs';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, ICommonResponse<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<ICommonResponse<T>> {
    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest();
    const response = httpContext.getResponse();

    const now = Date.now();

    return next.handle().pipe(map(res => ({
      count: Array.isArray(res) ? res.length : undefined,
      duration: `${Date.now() - now}ms`,
      path: request.path,
      method: request.method,
      statusCode: response.statusCode,
      data: res,
    })));
  }
}

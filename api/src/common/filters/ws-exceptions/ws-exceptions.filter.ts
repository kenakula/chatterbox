import { ArgumentsHost, Catch } from '@nestjs/common';
import { BaseWsExceptionFilter } from '@nestjs/websockets';
import { LoggerService } from '@common/logger';

export interface IWsException {
  response: {
    message: string[];
    error: string;
    statusCode: number;
  };
  status: number;
}

@Catch()
export class WsExceptionsFilter extends BaseWsExceptionFilter<IWsException> {
  private readonly logger = new LoggerService();

  catch(exception: IWsException, host: ArgumentsHost) {
    const message = exception.response.message.join('; ');
    this.logger.error(message, WsExceptionsFilter.name);

    super.catch(exception, host);
  }
}

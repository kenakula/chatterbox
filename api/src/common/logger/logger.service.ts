import { ConsoleLogger, Injectable, Scope } from '@nestjs/common';
import { ILogger } from '@domain/logger';

@Injectable({ scope: Scope.TRANSIENT })
export class LoggerService extends ConsoleLogger implements ILogger {
  log(message: any, context?: string) {
    super.log(message, context);
  }

  error(message: any, stackOrContext?: string) {
    super.error(message, stackOrContext);
  }

  warn(message: any, context?: string) {
    super.warn(message, context);
  }

  debug(message: any, context?: string) {
    super.debug(message, context);
  }

  verbose(message: any, context?: string) {
    super.verbose(message, context);
  }

  fatal(message: any, context?: string) {
    super.fatal(message, context);
  }
}

export interface ILogger {
  debug(message: string, context?: string): void;

  log(message: string, context?: string): void;

  error(message: string, stackOrContext?: string): void;

  warn(message: string, context?: string): void;

  verbose(message: string, context?: string): void;

  fatal(message: string, context?: string): void;
}

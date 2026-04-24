import { Injectable, Logger } from '@nestjs/common';
import { ILogger } from '../../application/ports/logger.port';

@Injectable()
export class AppLogger implements ILogger {
  private logger = new Logger('APP');

  log(message: any, context?: string) {
    this.logger.log(message, context);
    this.sendToLoki('info', message, context);
  }

  error(message: any, trace?: string, context?: string) {
    this.logger.error(message, trace, context);
    this.sendToLoki('error', message, context);
  }

  warn(message: any, context?: string) {
    this.logger.warn(message, context);
    this.sendToLoki('warn', message, context);
  }

  debug(message: any, context?: string) {
    this.logger.debug(message, context);
    this.sendToLoki('debug', message, context);
  }

  private sendToLoki(level: string, message: any, context?: string) {
    // aquí envías a Loki (o Grafana stack)
    
  }
}
import * as winston from 'winston';

import { ILogger, IloggerProps } from '@/common/interfaces';

export class Winston implements ILogger {
  private logger: winston.Logger;

  constructor(loggerProps: IloggerProps) {
    this.logger = winston.createLogger({
      level: loggerProps.level || 'info',
      transports: [new winston.transports.Console()],
    });
  }

  info(message: any) {
    this.logger.info(message);
  }

  error(message: any) {
    this.logger.error(message);
  }
}

import { ILogger } from '@/common/interfaces';

export class LoggerMock implements ILogger {
  info(message: any): void {}

  error(message: any): void {}
}

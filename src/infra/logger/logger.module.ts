import { Module } from '@nestjs/common';

import { TYPES } from '@/common/constants';
import { Winston } from './winston';

@Module({
  providers: [
    {
      provide: TYPES.Logger,
      useFactory: async () => {
        return new Winston({ level: 'info' });
      },
    },
  ],
  exports: [TYPES.Logger],
})
export class LoggerModule {}

import { Module } from '@nestjs/common';

import { DatabaseModule } from '@/infra/database';
import { LoggerModule } from '@/infra/logger';
import { UserModule } from '../user/user.module';
import { ConsentEventController } from './consent-event.controller';
import { CreateEventsUsecase } from './usecases';

@Module({
  imports: [DatabaseModule, LoggerModule, UserModule],
  controllers: [ConsentEventController],
  providers: [CreateEventsUsecase],
})
export class ConsentModule {}

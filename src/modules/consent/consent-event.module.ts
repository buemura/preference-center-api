import { Module } from '@nestjs/common';

import { DatabaseModule } from '@/infra/database';
import { ConsentEventController } from './consent-event.controller';
import { ConsentEventService } from './consent-event.service';

@Module({
  imports: [DatabaseModule],
  controllers: [ConsentEventController],
  providers: [ConsentEventService],
})
export class EventModule {}

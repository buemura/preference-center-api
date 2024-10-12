import { Module } from '@nestjs/common';

import { DatabaseModule } from '@/infra/database';
import { EventController } from './event.controller';
import { EventService } from './event.service';

@Module({
  imports: [DatabaseModule],
  controllers: [EventController],
  providers: [EventService],
})
export class EventModule {}

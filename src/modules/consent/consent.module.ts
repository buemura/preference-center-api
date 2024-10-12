import { Module } from '@nestjs/common';

import { DatabaseModule } from '@/infra/database';
import { ConsentEventController } from './consent-event.controller';
import { ConsentService } from './consent.service';

@Module({
  imports: [DatabaseModule],
  controllers: [ConsentEventController],
  providers: [ConsentService],
})
export class ConsentModule {}

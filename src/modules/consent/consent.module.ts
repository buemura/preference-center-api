import { Module } from '@nestjs/common';

import { DatabaseModule } from '@/infra/database';
import { UserModule } from '../user/user.module';
import { ConsentEventController } from './consent-event.controller';
import { ConsentService } from './consent.service';

@Module({
  imports: [DatabaseModule, UserModule],
  controllers: [ConsentEventController],
  providers: [ConsentService],
})
export class ConsentModule {}

import { Module } from '@nestjs/common';

import { DatabaseModule } from '@/infra/database';
import { LoggerModule } from '@/infra/logger';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [DatabaseModule, LoggerModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}

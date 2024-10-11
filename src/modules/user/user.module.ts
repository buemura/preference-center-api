import { Module } from '@nestjs/common';

import { TYPES } from '@/constants/types';
import { DatabaseModule } from '@/infra/database';
import { TypeOrmUserRepository } from '@/infra/database/repositories';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: TYPES.UserRepository,
      useClass: TypeOrmUserRepository,
    },
  ],
})
export class UserModule {}

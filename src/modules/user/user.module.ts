import { Module } from '@nestjs/common';

import { DatabaseModule } from '@/infra/database';
import { LoggerModule } from '@/infra/logger';
import { UserService } from './services/user.service';
import {
  CreateUserUsecase,
  DeleteUserUsecase,
  GetUserUsecase,
} from './usecases';
import { UserController } from './user.controller';

@Module({
  imports: [DatabaseModule, LoggerModule],
  controllers: [UserController],
  providers: [
    UserService,
    GetUserUsecase,
    CreateUserUsecase,
    DeleteUserUsecase,
  ],
  exports: [UserService, GetUserUsecase, CreateUserUsecase, DeleteUserUsecase],
})
export class UserModule {}

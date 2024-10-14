import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CreateUserDto } from './dtos';
import { User } from './entities';
import {
  CreateUserUsecase,
  DeleteUserUsecase,
  GetUserUsecase,
} from './usecases';

@Controller('users')
@ApiTags('Users')
export class UserController {
  constructor(
    private readonly getUserUsecase: GetUserUsecase,
    private readonly createUserUsecase: CreateUserUsecase,
    private readonly deleteUserUsecase: DeleteUserUsecase,
  ) {}

  @Get(':id')
  async getUser(@Param('id') id: string): Promise<User> {
    return this.getUserUsecase.execute(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createUser(@Body() input: CreateUserDto): Promise<User> {
    return this.createUserUsecase.execute(input);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<void> {
    await this.deleteUserUsecase.execute(id);
  }
}

import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';

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
  @ApiOkResponse({ description: 'User found' })
  @ApiNotFoundResponse({ description: 'User not found' })
  async getUser(@Param('id') id: string): Promise<User> {
    return this.getUserUsecase.execute(id);
  }

  @Post()
  @ApiCreatedResponse({ description: 'User created' })
  @ApiUnprocessableEntityResponse({ description: 'User already created' })
  async createUser(@Body() input: CreateUserDto): Promise<User> {
    return this.createUserUsecase.execute(input);
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'User deleted' })
  @ApiNotFoundResponse({ description: 'User not found' })
  async deleteUser(@Param('id') id: string): Promise<void> {
    await this.deleteUserUsecase.execute(id);
  }
}

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
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';

import {
  NotFoundSchema,
  UnprocessableEntitySchema,
} from '@/common/schemas/swagger.schema';
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
  @ApiOkResponse()
  @ApiNotFoundResponse({ type: NotFoundSchema })
  async getUser(@Param('id') id: string): Promise<User> {
    return this.getUserUsecase.execute(id);
  }

  @Post()
  @ApiCreatedResponse()
  @ApiUnprocessableEntityResponse({ type: UnprocessableEntitySchema })
  async createUser(@Body() input: CreateUserDto): Promise<User> {
    return this.createUserUsecase.execute(input);
  }

  @Delete(':id')
  @ApiOkResponse()
  @ApiNotFoundResponse({ type: NotFoundSchema })
  async deleteUser(@Param('id') id: string): Promise<void> {
    await this.deleteUserUsecase.execute(id);
  }
}

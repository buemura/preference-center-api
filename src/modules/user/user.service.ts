import {
  Inject,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';

import { TYPES } from '@/common/constants';
import { ILogger } from '@/common/interfaces';
import { CreateUserDto } from './dtos';
import { User } from './entities';
import { UserRepository } from './repositories';

@Injectable()
export class UserService {
  constructor(
    @Inject(TYPES.Logger)
    private readonly logger: ILogger,

    @Inject(TYPES.UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  async getUser(id: string): Promise<User> {
    this.logger.info(`[UserService][getUser] - Get user for id: ${id}`);

    const user = await this.userRepository.findById(id);
    if (!user) {
      this.logger.error(`[UserService][getUser] - User ${id} not found`);
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async createUser(input: CreateUserDto): Promise<User> {
    this.logger.info(
      `[UserService][createUser] - Validating user with email ${input.email}`,
    );

    const userExists = await this.userRepository.findByEmail(input.email);
    if (userExists) {
      this.logger.error(
        `[UserService][createUser] - User ${input.email} already exists`,
      );
      throw new UnprocessableEntityException('User already created');
    }

    this.logger.info(
      `[UserService][createUser] - Creating user for email ${input.email}`,
    );
    const user = User.create({ email: input.email });
    return this.userRepository.create(user);
  }

  async deleteUser(id: string): Promise<void> {
    this.logger.info(`[UserService][deleteUser] - Getting user for id: ${id}`);

    const user = await this.userRepository.findById(id);

    if (!user) {
      this.logger.error(`[UserService][deleteUser] - User ${id} not found`);
      throw new NotFoundException('User not found');
    }

    this.logger.info(`[UserService][deleteUser] - Deleting user for id: ${id}`);
    await this.userRepository.delete(id);
  }
}

import {
  Inject,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';

import { TYPES } from '@/common/constants';
import { ILogger } from '@/common/interfaces';
import { CreateUserDto } from '../dtos';
import { User } from '../entities';
import { UserRepository } from '../repositories';

@Injectable()
export class CreateUserUsecase {
  constructor(
    @Inject(TYPES.Logger)
    private readonly logger: ILogger,

    @Inject(TYPES.UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  async execute(input: CreateUserDto): Promise<User> {
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
}

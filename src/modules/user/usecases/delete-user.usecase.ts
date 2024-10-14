import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { TYPES } from '@/common/constants';
import { ILogger } from '@/common/interfaces';
import { User } from '../entities';
import { UserRepository } from '../repositories';

@Injectable()
export class DeleteUserUsecase {
  constructor(
    @Inject(TYPES.Logger)
    private readonly logger: ILogger,

    @Inject(TYPES.UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  async execute(id: string): Promise<void> {
    this.logger.info(`[UserService][deleteUser] - Getting user for id: ${id}`);

    const user = await this.getUserById(id);

    if (!user) {
      this.logger.error(`[UserService][deleteUser] - User ${id} not found`);
      throw new NotFoundException('User not found');
    }

    this.logger.info(`[UserService][deleteUser] - Deleting user for id: ${id}`);
    await this.userRepository.delete(id);
  }

  private async getUserById(id: string): Promise<User> {
    return this.userRepository.findById(id);
  }
}

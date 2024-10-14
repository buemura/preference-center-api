import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { TYPES } from '@/common/constants';
import { ILogger } from '@/common/interfaces';
import { User } from '../entities';
import { UserRepository } from '../repositories';

@Injectable()
export class GetUserUsecase {
  constructor(
    @Inject(TYPES.Logger)
    private readonly logger: ILogger,

    @Inject(TYPES.UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  async execute(id: string): Promise<User> {
    this.logger.info(`[GetUserUsecase][execute] - Getting user for id: ${id}`);

    const user = await this.userRepository.findById(id);
    if (!user) {
      this.logger.error(`[GetUserUsecase][execute] - User ${id} not found`);
      throw new NotFoundException('User not found');
    }

    return user;
  }
}

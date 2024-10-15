import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { TYPES } from '@/common/constants';
import { ILogger } from '@/common/interfaces';
import { GetUserResponseDto } from '../dtos';
import { UserRepository } from '../repositories';

@Injectable()
export class GetUserUsecase {
  constructor(
    @Inject(TYPES.Logger)
    private readonly logger: ILogger,

    @Inject(TYPES.UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  async execute(id: string): Promise<GetUserResponseDto> {
    this.logger.info(`[GetUserUsecase][execute] - Getting user for id: ${id}`);

    const user = await this.userRepository.findById(id);
    if (!user) {
      this.logger.error(`[GetUserUsecase][execute] - User ${id} not found`);
      throw new NotFoundException('User not found');
    }

    const formattedConsents = user.consents.map(({ consentId, enabled }) => ({
      id: consentId,
      enabled,
    }));

    return {
      id: user.id,
      email: user.email,
      consents: formattedConsents,
    };
  }
}

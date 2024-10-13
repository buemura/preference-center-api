import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { TYPES } from '@/common/constants';
import { ILogger } from '@/common/interfaces';
import { UserService } from '@/modules/user/user.service';
import { CreateEventsDto } from './dtos';
import { Consent, ConsentEvent } from './entities';
import { ConsentRepository } from './repositories';

@Injectable()
export class ConsentService {
  constructor(
    @Inject(TYPES.Logger)
    private readonly logger: ILogger,

    @Inject(TYPES.ConsentRepository)
    private readonly consentRepository: ConsentRepository,

    private readonly userService: UserService,
  ) {}

  async createEvents({ user, consents }: CreateEventsDto): Promise<Consent[]> {
    this.logger.info(
      `[ConsentService][createEvents] - Validating user for id: ${user.id}`,
    );

    const userExists = await this.userService.getUserById(user.id);
    if (!userExists) {
      this.logger.error(
        `[ConsentService][createEvents] - User ${user.id} not found`,
      );
      throw new NotFoundException('User not found');
    }

    const consentList: Consent[] = [];
    const consentEventList: ConsentEvent[] = [];

    consents.forEach((c) => {
      const input = {
        userId: userExists.id,
        consentId: c.id,
        enabled: c.enabled,
      };

      this.logger.info(
        `[ConsentService][createEvents] - Creating user for id: ${user.id}`,
      );

      consentList.push(Consent.create(input));
      consentEventList.push(ConsentEvent.create(input));
    });

    return this.consentRepository.bulkSave(consentList, consentEventList);
  }
}

import { Inject, Injectable } from '@nestjs/common';

import { TYPES } from '@/constants/types';
import { UserService } from '@/modules/user/user.service';
import { CreateEventsDto } from './dtos';
import { Consent, ConsentEvent } from './entities';
import { ConsentRepository } from './repositories';

@Injectable()
export class ConsentService {
  constructor(
    @Inject(TYPES.ConsentRepository)
    private readonly consentRepository: ConsentRepository,

    private readonly userService: UserService,
  ) {}

  async createEvents({ user, consents }: CreateEventsDto): Promise<Consent[]> {
    const userExists = await this.userService.getUser(user.id);

    const consentList: Consent[] = [];
    const consentEventList: ConsentEvent[] = [];

    consents.forEach((c) => {
      const input = {
        userId: userExists.id,
        consentId: c.id,
        enabled: c.enabled,
      };

      consentList.push(Consent.create(input));
      consentEventList.push(ConsentEvent.create(input));
    });

    return this.consentRepository.bulkSave(consentList, consentEventList);
  }
}

import { Inject, Injectable } from '@nestjs/common';

import { TYPES } from '@/constants/types';
import { CreateEventsDto } from './dtos';
import { Consent, ConsentEvent } from './entities';
import { ConsentRepository } from './repositories';

@Injectable()
export class ConsentService {
  constructor(
    @Inject(TYPES.ConsentRepository)
    private readonly consentRepository: ConsentRepository,
  ) {}

  async createEvents({ user, consents }: CreateEventsDto): Promise<Consent[]> {
    const consentList = consents.map((consent) =>
      Consent.create({
        userId: user.id,
        consentId: consent.id,
        enabled: consent.enabled,
      }),
    );

    const consentEventList = consents.map((consent) =>
      ConsentEvent.create({
        userId: user.id,
        consentId: consent.id,
        enabled: consent.enabled,
      }),
    );

    return this.consentRepository.bulkSave(consentList, consentEventList);
  }
}

import { Inject, Injectable } from '@nestjs/common';

import { TYPES } from '@/constants/types';
import { CreateEventDto } from './dtos';
import { Consent, ConsentEvent } from './entities';
import { ConsentRepository } from './repositories';

@Injectable()
export class ConsentEventService {
  constructor(
    @Inject(TYPES.ConsentRepository)
    private readonly consentRepository: ConsentRepository,
  ) {}

  async createEvent(input: CreateEventDto): Promise<Consent> {
    const consent = Consent.create(input);
    const consentEvent = ConsentEvent.create(input);
    return this.consentRepository.create(consent, consentEvent);
  }
}

import { Inject, Injectable } from '@nestjs/common';

import { TYPES } from '@/constants/types';
import { ConsentRepository } from '../consent/consent.repository';
import { CreateEventDto } from './dtos/create-event.dto';
import { ConsentEvent } from './event';
import { Consent } from '../consent/consent';

@Injectable()
export class EventService {
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

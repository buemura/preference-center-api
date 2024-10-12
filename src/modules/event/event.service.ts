import { Inject, Injectable } from '@nestjs/common';

import { TYPES } from '@/constants/types';
import { CreateEventDto } from './dtos/create-event.dto';
import { ConsentEvent } from './event';
import { ConsentEventRepository } from './event.repository';

@Injectable()
export class EventService {
  constructor(
    @Inject(TYPES.ConsentEventRepository)
    private readonly consentEventRepository: ConsentEventRepository,
  ) {}

  async createEvent(input: CreateEventDto) {
    const consentEvent = ConsentEvent.create(input);
    return this.consentEventRepository.create(consentEvent);
  }
}

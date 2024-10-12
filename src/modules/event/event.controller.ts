import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Consent } from '../consent/consent';
import { CreateEventDto } from './dtos';
import { EventService } from './event.service';

@Controller('events')
@ApiTags('events')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  async createEvent(@Body() input: CreateEventDto): Promise<Consent> {
    return this.eventService.createEvent(input);
  }
}

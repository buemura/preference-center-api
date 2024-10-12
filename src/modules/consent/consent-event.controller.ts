import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ConsentEventService } from './consent-event.service';
import { CreateEventDto } from './dtos';
import { Consent } from './entities';

@Controller('events')
@ApiTags('events')
export class ConsentEventController {
  constructor(private readonly eventService: ConsentEventService) {}

  @Post()
  async createEvent(@Body() input: CreateEventDto): Promise<Consent> {
    return this.eventService.createEvent(input);
  }
}

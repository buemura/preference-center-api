import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CreateEventDto } from './dtos/create-event.dto';
import { ConsentEvent } from './event';
import { EventService } from './event.service';

@Controller('events')
@ApiTags('events')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  async createEvent(@Body() input: CreateEventDto): Promise<ConsentEvent> {
    return this.eventService.createEvent(input);
  }
}

import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CreateEventDto } from './dtos/create-event.dto';

@Controller('events')
@ApiTags('events')
export class EventController {
  @Post()
  async createEvent(@Body() input: CreateEventDto): Promise<void> {}
}

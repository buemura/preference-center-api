import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ConsentService } from './consent.service';
import { CreateEventsDto } from './dtos';
import { Consent } from './entities';

@Controller('events')
@ApiTags('events')
export class ConsentEventController {
  constructor(private readonly consentService: ConsentService) {}

  @Post()
  async createEvents(@Body() input: CreateEventsDto): Promise<Consent[]> {
    return this.consentService.createEvents(input);
  }
}

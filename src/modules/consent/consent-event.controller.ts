import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CreateEventsDto } from './dtos';
import { Consent } from './entities';
import { CreateEventsUsecase } from './usecases';

@Controller('events')
@ApiTags('events')
export class ConsentEventController {
  constructor(private readonly createEventsUsecase: CreateEventsUsecase) {}

  @Post()
  async createEvents(@Body() input: CreateEventsDto): Promise<Consent[]> {
    return this.createEventsUsecase.execute(input);
  }
}

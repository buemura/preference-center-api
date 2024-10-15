import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiTags,
} from '@nestjs/swagger';

import { CreateEventsDto } from './dtos';
import { Consent } from './entities';
import { CreateEventsUsecase } from './usecases';

@Controller('events')
@ApiTags('events')
export class ConsentEventController {
  constructor(private readonly createEventsUsecase: CreateEventsUsecase) {}

  @Post()
  @ApiCreatedResponse({ description: 'Consent events created' })
  @ApiNotFoundResponse({ description: 'User not found' })
  async createEvents(@Body() input: CreateEventsDto): Promise<Consent[]> {
    return this.createEventsUsecase.execute(input);
  }
}

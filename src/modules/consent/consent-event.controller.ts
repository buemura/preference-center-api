import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiTags,
} from '@nestjs/swagger';

import { NotFoundSchema } from '@/common/schemas/swagger.schema';
import { CreateEventsDto } from './dtos';
import { Consent } from './entities';
import { CreateEventsUsecase } from './usecases';

@Controller('events')
@ApiTags('events')
export class ConsentEventController {
  constructor(private readonly createEventsUsecase: CreateEventsUsecase) {}

  @Post()
  @ApiCreatedResponse()
  @ApiNotFoundResponse({ type: NotFoundSchema })
  async createEvents(@Body() input: CreateEventsDto): Promise<Consent[]> {
    return this.createEventsUsecase.execute(input);
  }
}

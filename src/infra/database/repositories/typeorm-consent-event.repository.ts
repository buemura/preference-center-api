import { Inject, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { TYPES } from '@/constants/types';
import { ConsentEvent } from '@/modules/event/event';
import { ConsentEventRepository } from '@/modules/event/event.repository';
import { ConsentEventSchema } from '../schemas/consent-event.schema';

@Injectable()
export class TypeOrmConsentEventRepository implements ConsentEventRepository {
  private repository: Repository<ConsentEvent>;

  constructor(
    @Inject(TYPES.DataSource) private readonly connection: DataSource,
  ) {
    this.repository = this.connection.getRepository(ConsentEventSchema);
  }

  async create(consentEvent: ConsentEvent): Promise<ConsentEvent> {
    await this.repository.insert(consentEvent);
    return consentEvent;
  }
}

import { Inject, Injectable } from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';

import { TYPES } from '@/constants/types';
import { Consent, ConsentEvent } from '@/modules/consent/entities';
import { ConsentRepository } from '@/modules/consent/repositories';
import { ConsentEventSchema } from '../schemas/consent-event.schema';
import { ConsentSchema } from '../schemas/consent.schema';

@Injectable()
export class TypeOrmConsentRepository implements ConsentRepository {
  constructor(
    @Inject(TYPES.DataSource)
    private readonly connection: DataSource,
  ) {}

  async bulkSave(
    consents: Consent[],
    events: ConsentEvent[],
  ): Promise<Consent[]> {
    return this.connection.transaction(async (manager: EntityManager) => {
      const savedConsents = await manager
        .getRepository(ConsentSchema)
        .save(consents);

      await manager.getRepository(ConsentEventSchema).save(events);

      return savedConsents;
    });
  }
}

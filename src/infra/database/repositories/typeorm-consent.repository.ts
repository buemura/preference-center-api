import { Inject, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { TYPES } from '@/constants/types';
import { Consent } from '@/modules/consent/consent';
import { ConsentRepository } from '@/modules/consent/consent.repository';
import { ConsentSchema } from '../schemas/consent.schema';
import { ConsentEvent } from '@/modules/event/event';
import { ConsentEventSchema } from '../schemas/consent-event.schema';

@Injectable()
export class TypeOrmConsentRepository implements ConsentRepository {
  private consentRepository: Repository<Consent>;
  private consentEventrepository: Repository<ConsentEvent>;

  constructor(
    @Inject(TYPES.DataSource)
    private readonly connection: DataSource,
  ) {
    this.consentRepository = this.connection.getRepository(ConsentSchema);
    this.consentEventrepository =
      this.connection.getRepository(ConsentEventSchema);
  }

  async create(consent: Consent, consentEvent: ConsentEvent): Promise<Consent> {
    try {
      return await this.connection.transaction(async (manager) => {
        const savedConsent = await manager
          .getRepository(ConsentSchema)
          .save(consent);

        await manager.getRepository(ConsentEventSchema).save(consentEvent);

        return savedConsent;
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

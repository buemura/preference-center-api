import { Inject, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { TYPES } from '@/constants/types';
import { Consent } from '@/modules/consent/consent';
import { ConsentRepository } from '@/modules/consent/consent.repository';
import { ConsentSchema } from '../schemas/consent.schema';

@Injectable()
export class TypeOrmConsentRepository implements ConsentRepository {
  private repository: Repository<Consent>;

  constructor(
    @Inject(TYPES.DataSource) private readonly connection: DataSource,
  ) {
    this.repository = this.connection.getRepository(ConsentSchema);
  }

  async create(consent: Consent): Promise<Consent> {
    await this.repository.insert(consent);
    return consent;
  }
}

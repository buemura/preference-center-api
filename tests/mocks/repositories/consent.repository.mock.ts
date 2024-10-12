import { Consent, ConsentEvent } from '@/modules/consent/entities';
import { ConsentRepository } from '@/modules/consent/repositories';

export class ConsentRepositoryMock implements ConsentRepository {
  bulkSave(consent: Consent[], event: ConsentEvent[]): Promise<Consent[]> {
    return Promise.resolve(consent);
  }
}

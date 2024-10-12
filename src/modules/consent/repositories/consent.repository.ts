import { Consent, ConsentEvent } from '../entities';

export interface ConsentRepository {
  bulkSave(consent: Consent[], event: ConsentEvent[]): Promise<Consent[]>;
}

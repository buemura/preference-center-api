import { Consent, ConsentEvent } from '../entities';

export interface ConsentRepository {
  create(consent: Consent, event: ConsentEvent): Promise<Consent>;
}

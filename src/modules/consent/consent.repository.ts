import { ConsentEvent } from '../event/event';
import { Consent } from './consent';

export interface ConsentRepository {
  create(consent: Consent, event: ConsentEvent): Promise<Consent>;
}

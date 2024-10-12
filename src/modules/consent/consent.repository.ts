import { Consent } from './consent';

export interface ConsentRepository {
  create(consent: Consent): Promise<Consent>;
}

import { ConsentEvent } from '../event/event';
import { User } from '../user/user';
import { ConsentId } from './consent.enum';

export type ConsentCtor = {
  consentId: ConsentId;
  userId: string;
  enabled: boolean;
};

export class Consent {
  consentId: string;
  userId: string;
  enabled: boolean;
  user: User;
  consentEvents: ConsentEvent[];

  static create(props: ConsentCtor) {
    const consent = new Consent();
    Object.assign(consent, {
      consentId: props.consentId,
      userId: props.userId,
      enabled: props.enabled,
    });
    return consent;
  }
}

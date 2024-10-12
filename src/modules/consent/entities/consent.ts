import { User } from '@/modules/user/entities';
import { ConsentId } from '../enums';
import { ConsentEvent } from './consent-event';

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

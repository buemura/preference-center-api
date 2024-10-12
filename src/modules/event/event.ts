import { randomUUID } from 'crypto';
import { Consent } from '../consent/consent';
import { User } from '../user/user';

type ConsentEventCtor = {
  userId: string;
  consentId: string;
  enabled: boolean;
};

export class ConsentEvent {
  id: string;
  userId: string;
  consentId: string;
  enabled: boolean;
  createdAt: Date;
  user: User;
  consent: Consent[];

  static create(props: ConsentEventCtor) {
    const event = new ConsentEvent();
    Object.assign(event, {
      id: randomUUID(),
      userId: props.userId,
      consentId: props.consentId,
      enabled: props.enabled,
      createdAt: new Date(),
    });
    return event;
  }
}

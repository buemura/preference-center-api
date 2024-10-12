import { ConsentEvent } from '../event/event';
import { User } from '../user/user';
import { ConsentId } from './consent.enum';

type NotificationType = 'email' | 'sms';

export type ConsentCtor = {
  userId: string;
  enabled: boolean;
  type: NotificationType;
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
      consentId: this.generateId(props.type),
      userId: props.userId,
      enabled: props.enabled,
    });
    return consent;
  }

  private static generateId(type: NotificationType): string {
    return type === 'email'
      ? ConsentId.EMAIL_NOTIFICATIONS
      : ConsentId.SMS_NOTIFICATIONS;
  }
}

import { ConsentId } from './consent.enum';

type NotificationType = 'email' | 'sms';

export type ConsentCtor = {
  userId: string;
  enabled: boolean;
  type: NotificationType;
};

export class Consent {
  id: string;
  userId: string;
  enabled: boolean;

  constructor(input: ConsentCtor) {
    this.id = this.generateId(input?.type);
    this.userId = input?.userId;
    this.enabled = input?.enabled;
  }

  private generateId(type: NotificationType): string {
    return type === 'email'
      ? ConsentId.EMAIL_NOTIFICATIONS
      : ConsentId.SMS_NOTIFICATIONS;
  }
}

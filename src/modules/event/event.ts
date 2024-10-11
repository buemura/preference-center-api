import { randomUUID } from 'crypto';

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

  constructor(input: ConsentEventCtor) {
    this.id = randomUUID();
    this.userId = input?.userId;
    this.consentId = input?.consentId;
    this.enabled = input?.enabled;
    this.createdAt = new Date();
  }
}

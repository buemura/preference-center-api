import { randomUUID } from 'crypto';

import { Consent } from '@/modules/consent/consent';

export type UserCtor = {
  email: string;
};

export class User {
  id: string;
  email: string;
  consents: Consent[];
  createdAt: Date;

  static create(props: UserCtor): User {
    const user = new User();
    Object.assign(user, {
      id: randomUUID(),
      email: props.email,
      consent: [],
      createdAt: new Date(),
    });
    return user;
  }
}

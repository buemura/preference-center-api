import { randomUUID } from 'crypto';

import { Consent, ConsentEvent } from '@/modules/consent/entities';

export type UserCtor = {
  email: string;
};

export class User {
  id: string;
  email: string;
  consents: Consent[];
  consentEvents: ConsentEvent[];

  static create(props: UserCtor): User {
    const user = new User();
    Object.assign(user, {
      id: randomUUID(),
      email: props.email,
    });
    return user;
  }
}

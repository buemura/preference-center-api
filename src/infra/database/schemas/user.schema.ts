import { EntitySchema } from 'typeorm';

import { User } from '@/modules/user/entities';
import { Consent, ConsentEvent } from '@/modules/consent/entities';

export const UserSchema = new EntitySchema<User>({
  name: 'User',
  tableName: 'user',
  target: User,
  columns: {
    id: {
      type: 'uuid',
      primary: true,
      generated: 'uuid',
    },
    email: {
      type: String,
      unique: true,
      nullable: false,
    },
  },
  relations: {
    consents: {
      type: 'one-to-many',
      target: () => Consent,
      inverseSide: 'user',
    },
    consentEvents: {
      type: 'one-to-many',
      target: () => ConsentEvent,
      inverseSide: 'user',
    },
  },
});

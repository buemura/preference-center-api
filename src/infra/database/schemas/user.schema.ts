import { EntitySchema } from 'typeorm';

import { User } from '@/modules/user/user';

export const UserSchema = new EntitySchema<User>({
  name: 'User',
  tableName: 'users',
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
      target: 'Consent',
      inverseSide: 'user',
    },
    consentEvents: {
      type: 'one-to-many',
      target: 'ConsentEvent',
      inverseSide: 'user',
    },
  },
});

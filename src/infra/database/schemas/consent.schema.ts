import { EntitySchema } from 'typeorm';

import { Consent } from '@/modules/consent/entities';

export const ConsentSchema = new EntitySchema<Consent>({
  name: 'Consent',
  tableName: 'consents',
  target: Consent,
  columns: {
    consentId: {
      type: String,
      primary: true,
      name: 'consent_id',
    },
    userId: {
      type: String,
      primary: true,
      name: 'user_id',
    },
    enabled: {
      type: Boolean,
      nullable: true,
    },
  },
  relations: {
    user: {
      type: 'many-to-one',
      target: 'User',
      joinColumn: { name: 'user_id' },
      inverseSide: 'consents',
    },
    consentEvents: {
      type: 'one-to-many',
      target: 'ConsentEvent',
      inverseSide: 'consent',
    },
  },
  indices: [
    {
      name: 'IDX_CONSENT_COMPOSITE_KEY',
      columns: ['consentId', 'userId'],
    },
  ],
  uniques: [
    {
      name: 'UNQ_CONSENT_COMPOSITE_KEY',
      columns: ['consentId', 'userId'],
    },
  ],
});

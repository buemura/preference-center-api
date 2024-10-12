import { EntitySchema } from 'typeorm';

import { ConsentEvent } from '@/modules/consent/entities';

export const ConsentEventSchema = new EntitySchema<ConsentEvent>({
  name: 'ConsentEvent',
  tableName: 'consent_events',
  target: ConsentEvent,
  columns: {
    id: {
      type: 'uuid',
      primary: true,
      generated: 'uuid',
    },
    userId: {
      type: String,
      name: 'user_id',
    },
    consentId: {
      type: String,
      name: 'consent_id',
    },
    enabled: {
      type: Boolean,
      nullable: true,
    },
    createdAt: {
      type: 'timestamp',
      createDate: true,
      name: 'created_at',
    },
  },
  relations: {
    user: {
      type: 'many-to-one',
      target: 'User',
      joinColumn: { name: 'user_id' },
      inverseSide: 'consentEvents',
    },
    consent: {
      type: 'many-to-one',
      target: 'Consent',
      joinColumn: [{ name: 'user_id' }, { name: 'consent_id' }],
      inverseSide: 'consentEvents',
    },
  },
  indices: [
    {
      name: 'IDX_CONSENT_EVENT_COMPOSITE_KEY',
      columns: ['userId', 'consentId'],
    },
  ],
});

import { EntitySchema } from 'typeorm';

import { ConsentEvent } from '@/modules/event/event';

export const ConsentEventSchema = new EntitySchema<ConsentEvent>({
  name: ConsentEvent.name,
  tableName: 'consent_events',
  target: ConsentEvent,
  columns: {
    id: {
      type: String,
      primary: true,
    },
    userId: {
      type: String,
      nullable: false,
    },
    consentId: {
      type: String,
      nullable: false,
    },
    enabled: {
      type: Boolean,
      nullable: false,
    },
    createdAt: {
      name: 'created_at',
      type: 'timestamp',
      nullable: false,
    },
  },
});

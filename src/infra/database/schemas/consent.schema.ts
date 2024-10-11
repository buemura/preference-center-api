import { EntitySchema } from 'typeorm';

import { Consent } from '@/modules/consent/consent';

export const ConsentSchema = new EntitySchema<Consent>({
  name: Consent.name,
  tableName: 'consents',
  target: Consent,
  columns: {
    id: {
      type: String,
      primary: true,
    },
    enabled: {
      type: Boolean,
      nullable: false,
    },
    userId: {
      type: String,
      nullable: false,
    },
  },
});

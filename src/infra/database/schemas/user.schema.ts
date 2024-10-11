import { EntitySchema } from 'typeorm';

import { User } from '@/modules/user/user';

export const UserSchema = new EntitySchema<User>({
  name: User.name,
  tableName: 'users',
  target: User,
  columns: {
    id: {
      type: String,
      primary: true,
    },
    email: {
      type: String,
      nullable: false,
      unique: true,
    },
    createdAt: {
      name: 'created_at',
      type: 'timestamp',
      nullable: false,
    },
  },
});

import { Provider } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { TYPES } from '@/common/constants';
import {
  TypeOrmConsentRepository,
  TypeOrmUserRepository,
} from './repositories';

export const databaseProviders: Provider[] = [
  {
    provide: TYPES.DataSource,
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT),
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        migrationsRun: true,
        entities: [__dirname + '/schemas/*.js'],
        migrations: [__dirname + '/migrations/*.js'],
      });

      return dataSource.initialize();
    },
  },
  {
    provide: TYPES.UserRepository,
    useClass: TypeOrmUserRepository,
  },
  {
    provide: TYPES.ConsentRepository,
    useClass: TypeOrmConsentRepository,
  },
];

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ConsentModule } from './consent/consent.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    UserModule,
    ConsentModule,
  ],
})
export class AppModule {}

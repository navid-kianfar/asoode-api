import { Module } from '@nestjs/common';
import { AccountModule } from './account/account.module';
import { DataAccessModule } from './data-access/data-access.module';
import { ConfigModule } from '@nestjs/config';
import * as process from 'process';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: process.env.ASOODE !== undefined,
    }),
    AccountModule,
    DataAccessModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

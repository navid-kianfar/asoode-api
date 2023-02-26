import { Module } from '@nestjs/common';
import { AccountController } from './account/account.controller';
import { AccountService } from './account/account.service';
import { DataAccessModule } from '../data-access/data-access.module';

@Module({
  imports: [DataAccessModule],
  controllers: [AccountController],
  providers: [AccountService],
})
export class AccountModule {}

import { Module } from '@nestjs/common';
import { AccountController } from './account/account.controller';
import { AccountService } from './account/account.service';
import { AccountRepositoryService } from './account/account-repository.service';

@Module({
  controllers: [AccountController],
  providers: [AccountService, AccountRepositoryService],
})
export class AccountModule {}

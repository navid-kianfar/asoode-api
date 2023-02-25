import { Body, Controller, Post } from '@nestjs/common';
import { SigninRequest, SignupRequest } from 'asoode-common';
import { AccountService } from './account.service';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post('signin') async signin(@Body() model: SigninRequest) {
    return await this.accountService.signin(model);
  }
  @Post('signup') async signup(@Body() model: SignupRequest) {
    return await this.accountService.signup(model);
  }
  // @Post('forgot') async forgot(@Body() request: ForgotRequest) {}
}

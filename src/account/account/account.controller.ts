import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import {
  OperationResult,
  SigninRequest,
  SigninResponse,
  SignupRequest,
  SignupResponse,
} from 'asoode-common';
import { AccountService } from './account.service';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post('signin')
  @HttpCode(200)
  async signin(
    @Body() model: SigninRequest,
  ): Promise<OperationResult<SigninResponse>> {
    return await this.accountService.signin(model);
  }
  @Post('signup')
  @HttpCode(200)
  async signup(
    @Body() model: SignupRequest,
  ): Promise<OperationResult<SignupResponse>> {
    return await this.accountService.signup(model);
  }
  // @Post('forgot') async forgot(@Body() request: ForgotRequest) {}
}

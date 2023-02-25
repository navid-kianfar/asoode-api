import { Injectable } from '@nestjs/common';
import {
  SigninRequest,
  SigninResponse,
  SignupRequest,
  SignupResponse,
  OperationResult,
} from 'asoode-common';

@Injectable()
export class AccountService {
  async signin(
    model: SigninRequest,
  ): Promise<OperationResult<SigninResponse>> {throw new Error();}
  async signup(
    model: SignupRequest,
  ): Promise<OperationResult<SignupResponse>> { throw new Error(); }
}

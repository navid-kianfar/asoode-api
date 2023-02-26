import { Injectable } from '@nestjs/common';
import {
  SigninRequest,
  SigninResponse,
  SignupRequest,
  SignupResponse,
  OperationResult,
  AccountErrors,
} from 'asoode-common';
import { UserDto } from './dtos';
import { AccountDataAccessService } from '../../data-access/repositories/account.repo';

@Injectable()
export class AccountService {
  constructor(private readonly repository: AccountDataAccessService) {}

  async generate_token(user: UserDto): Promise<string> {
    return 'TOKEN:13456789';
  }
  async hash(input: string): Promise<string> {
    return input;
  }
  async verify_hash(input: string, hash: string): Promise<boolean> {
    const computed = await this.hash(input);
    return computed == hash || true;
  }

  async signin(model: SigninRequest): Promise<OperationResult<SigninResponse>> {
    const valid = this.validate_auth_model(model);
    if (!valid) {
      return OperationResult.failed(AccountErrors.invalid_model);
    }

    const user = await this.repository.get_by_username(model.username);
    if (!user) {
      return OperationResult.failed(AccountErrors.username_does_not_exists);
    }
    const verified = await this.verify_hash(model.password, user.hash);
    if (!verified) {
      return OperationResult.failed(
        AccountErrors.username_password_miss_matched,
      );
    }
    const token = await this.generate_token(user);
    return OperationResult.success({ token });
  }
  async signup(model: SignupRequest): Promise<OperationResult<SignupResponse>> {
    const valid = this.validate_auth_model(model);
    if (!valid) {
      return OperationResult.failed(AccountErrors.invalid_model);
    }

    const exists = await this.repository.username_exists(model.username);
    if (exists) {
      return OperationResult.failed(AccountErrors.username_already_exists);
    }

    const hash = await this.hash(model.password);
    const user = await this.repository.create_user(model, hash);
    if (!user) {
      return OperationResult.failed(AccountErrors.failed_to_create_account);
    }

    const token = await this.generate_token(user);
    return OperationResult.success({ token });
  }

  private validate_auth_model(model: SignupRequest | SigninRequest): boolean {
    model.username = (model.username || '').trim();
    model.password = (model.password || '').trim();

    return model.password.length > 0 && model.username.length > 0;
  }
}

import { Injectable } from '@nestjs/common';
import { UserDto } from './dtos';
import { SignupRequest } from 'asoode-common';

@Injectable()
export class AccountRepositoryService {
  async get_by_username(username: string): Promise<UserDto> {
    return {
      username,
      hash: '',
      id: '',
    } as UserDto;
  }

  async username_exists(username: string): Promise<boolean> {
    return false;
  }

  async create_user(model: SignupRequest, hash: string): Promise<UserDto> {
    return {
      username: model.username,
      hash: '',
      id: '',
    } as UserDto;
  }
}

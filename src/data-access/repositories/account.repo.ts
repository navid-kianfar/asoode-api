import { Injectable } from '@nestjs/common';
import { UserDto } from '../../account/account/dtos';
import { SignupRequest } from 'asoode-common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { v4 as UUID } from 'uuid';

@Injectable()
export class AccountDataAccessService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async get_by_username(username: string): Promise<UserDto> {
    const user = await this.usersRepository.findOneBy({ username });
    if (!user) return null;
    return user.toDto();
  }

  async username_exists(username: string): Promise<boolean> {
    return await this.usersRepository.exist({ where: { username } });
  }

  async create_user(model: SignupRequest, hash: string): Promise<UserDto> {
    const user = new User();
    user.username = model.username;
    user.hash = hash;
    user.id = UUID();
    const created = await this.usersRepository.save(user);
    if (!created) return null;
    return created.toDto();
  }
}

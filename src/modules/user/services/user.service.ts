import { Inject, Injectable } from '@nestjs/common';

import { TYPES } from '@/common/constants';
import { User } from '../entities';
import { UserRepository } from '../repositories';

@Injectable()
export class UserService {
  constructor(
    @Inject(TYPES.UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  async getUserById(id: string): Promise<User> {
    return this.userRepository.findById(id);
  }
}

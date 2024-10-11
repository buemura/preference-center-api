import {
  Inject,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';

import { TYPES } from '@/constants/types';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from './user';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    @Inject(TYPES.UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  async getUser(id: string): Promise<User> {
    return this.userRepository.findById(id);
  }

  async createUser(input: CreateUserDto): Promise<User> {
    const userExists = await this.userRepository.findByEmail(input.email);
    if (userExists) {
      throw new UnprocessableEntityException('User already registered');
    }

    const user = User.create({
      email: input.email,
    });
    return this.userRepository.create(user);
  }

  async deleteUser(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}

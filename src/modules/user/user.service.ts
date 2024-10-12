import {
  Inject,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';

import { TYPES } from '@/constants/types';
import { CreateUserDto } from './dtos';
import { User } from './entities';
import { UserRepository } from './repositories';

@Injectable()
export class UserService {
  constructor(
    @Inject(TYPES.UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  async getUser(id: string): Promise<User> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async createUser(input: CreateUserDto): Promise<User> {
    const userExists = await this.userRepository.findByEmail(input.email);
    if (userExists) {
      throw new UnprocessableEntityException('User already created');
    }

    const user = User.create({ email: input.email });
    return this.userRepository.create(user);
  }

  async deleteUser(id: string): Promise<void> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.userRepository.delete(id);
  }
}

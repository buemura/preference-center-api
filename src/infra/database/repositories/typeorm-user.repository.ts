import { Inject, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { TYPES } from '@/constants/types';
import { User } from '@/modules/user/entities';
import { UserRepository } from '@/modules/user/repositories';
import { UserSchema } from '../schemas/user.schema';

@Injectable()
export class TypeOrmUserRepository implements UserRepository {
  private repository: Repository<User>;

  constructor(
    @Inject(TYPES.DataSource) private readonly connection: DataSource,
  ) {
    this.repository = this.connection.getRepository(UserSchema);
  }

  async findById(id: string): Promise<User> {
    const user = await this.repository.findOneOrFail({
      where: { id },
      relations: ['consents'],
    });

    return user;
  }

  async findByEmail(email: string): Promise<User> {
    return this.repository.findOne({ where: { email } });
  }

  async create(user: User): Promise<User> {
    await this.repository.insert(user);
    return user;
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}

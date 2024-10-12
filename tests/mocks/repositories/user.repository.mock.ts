import { User } from '@/modules/user/entities';
import { UserRepository } from '@/modules/user/repositories';

export const USER_MOCK_DATA: User = {
  id: 'any_id',
  email: 'any_email',
  consents: [],
  consentEvents: [],
};

export class UserRepositoryMock implements UserRepository {
  async findById(id: string): Promise<User> {
    return Promise.resolve(USER_MOCK_DATA);
  }

  async findByEmail(email: string): Promise<User> {
    return Promise.resolve(USER_MOCK_DATA);
  }

  async create(user: User): Promise<User> {
    return Promise.resolve(user);
  }

  async delete(id: string): Promise<void> {
    return Promise.resolve();
  }
}

import { User } from './user';

export interface UserRepository {
  findById(id: string): Promise<User>;
  create(user: User): Promise<User>;
  delete(id: string): Promise<void>;
}

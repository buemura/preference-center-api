import { User } from './user';

export interface UserRepository {
  findById(id: string): Promise<User>;
  findByEmail(email: string): Promise<User>;
  create(user: User): Promise<User>;
  delete(id: string): Promise<void>;
}

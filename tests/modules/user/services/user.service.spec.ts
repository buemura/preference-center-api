import { UserRepository } from '@/modules/user/repositories';
import { UserService } from '@/modules/user/services';
import { UserRepositoryMock } from '../../../mocks/repositories/user.repository.mock';

describe('UserService', () => {
  let userRepository: UserRepository;
  let sut: UserService;

  beforeAll(() => {
    userRepository = new UserRepositoryMock();
    sut = new UserService(userRepository);
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should call userRepository with correct params', async () => {
    const id = 'any_id';
    const findByIdSpy = jest.spyOn(userRepository, 'findById');

    await sut.getUserById(id);
    expect(findByIdSpy).toHaveBeenCalledWith(id);
  });
});

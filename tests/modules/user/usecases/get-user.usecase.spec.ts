import { NotFoundException } from '@nestjs/common';

import { UserRepository } from '@/modules/user/repositories';
import { GetUserUsecase } from '@/modules/user/usecases';
import { LoggerMock } from '../../../mocks/logger/logger.mock';
import { UserRepositoryMock } from '../../../mocks/repositories/user.repository.mock';

describe('GetUserUsecase', () => {
  let userRepository: UserRepository;
  let sut: GetUserUsecase;

  beforeAll(() => {
    userRepository = new UserRepositoryMock();
    sut = new GetUserUsecase(new LoggerMock(), userRepository);
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should throw not found error when user is not found', async () => {
    const id = 'any_id';

    jest.spyOn(userRepository, 'findById').mockResolvedValueOnce(null);
    await expect(sut.execute(id)).rejects.toThrow(NotFoundException);
  });

  it('should return an user', async () => {
    const id = 'any_id';
    const findByIdSpy = jest.spyOn(userRepository, 'findById');

    await sut.execute(id);
    expect(findByIdSpy).toHaveBeenCalledWith(id);
  });
});

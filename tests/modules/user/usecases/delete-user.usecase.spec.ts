import { NotFoundException } from '@nestjs/common';

import { UserRepository } from '@/modules/user/repositories';
import { DeleteUserUsecase } from '@/modules/user/usecases';
import { LoggerMock } from '../../../mocks/logger/logger.mock';
import { UserRepositoryMock } from '../../../mocks/repositories/user.repository.mock';

describe('DeleteUserUsecase', () => {
  let userRepository: UserRepository;
  let sut: DeleteUserUsecase;

  beforeAll(() => {
    userRepository = new UserRepositoryMock();
    sut = new DeleteUserUsecase(new LoggerMock(), userRepository);
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should throw not found error when user is not found', async () => {
    const id = 'any_id';

    jest.spyOn(userRepository, 'findById').mockResolvedValueOnce(null);
    const deleteSpy = jest.spyOn(userRepository, 'delete');

    await expect(sut.execute(id)).rejects.toThrow(NotFoundException);
    expect(deleteSpy).not.toHaveBeenCalled();
  });

  it('should delete user', async () => {
    const id = 'any_id';
    const deleteSpy = jest.spyOn(userRepository, 'delete');

    await sut.execute(id);
    expect(deleteSpy).toHaveBeenCalledWith(id);
  });
});

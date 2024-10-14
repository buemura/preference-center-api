import { UnprocessableEntityException } from '@nestjs/common';

import { UserRepository } from '@/modules/user/repositories';
import { CreateUserUsecase } from '@/modules/user/usecases';
import { LoggerMock } from '../../../mocks/logger/logger.mock';
import { UserRepositoryMock } from '../../../mocks/repositories/user.repository.mock';

describe('CreateUserUsecase', () => {
  let userRepository: UserRepository;
  let sut: CreateUserUsecase;

  beforeAll(() => {
    userRepository = new UserRepositoryMock();
    sut = new CreateUserUsecase(new LoggerMock(), userRepository);
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should throw unprocessable entity error when user already created', async () => {
    const createSpy = jest.spyOn(userRepository, 'create');

    const res = sut.execute({ email: 'existing_email' });
    await expect(res).rejects.toThrow(UnprocessableEntityException);
    expect(createSpy).not.toHaveBeenCalled();
  });

  it('should create and return an user', async () => {
    const email = 'valid_email';

    const findByEmailSpy = jest
      .spyOn(userRepository, 'findByEmail')
      .mockResolvedValueOnce(null);

    const createSpy = jest.spyOn(userRepository, 'create');

    const res = await sut.execute({ email });
    expect(findByEmailSpy).toHaveBeenCalledWith(email);
    expect(createSpy).toHaveBeenCalled();
    expect(res).toBeDefined();
  });
});

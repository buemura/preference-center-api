import {
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';

import { UserRepository } from '../../../src/modules/user/repositories';
import { UserService } from '../../../src/modules/user/user.service';
import { UserRepositoryMock } from '../../mocks/repositories/user.repository.mock';

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

  describe('getUser', () => {
    it('should throw not found error when user is not found', async () => {
      const id = 'any_id';

      jest.spyOn(userRepository, 'findById').mockResolvedValueOnce(null);
      await expect(sut.getUser(id)).rejects.toThrow(NotFoundException);
    });

    it('should return an user', async () => {
      const id = 'any_id';
      const findByIdSpy = jest.spyOn(userRepository, 'findById');

      await sut.getUser(id);
      expect(findByIdSpy).toHaveBeenCalledWith(id);
    });
  });

  describe('createUser', () => {
    it('should throw unprocessable entity error when user already created', async () => {
      const createSpy = jest.spyOn(userRepository, 'create');

      const res = sut.createUser({ email: 'existing_email' });
      await expect(res).rejects.toThrow(UnprocessableEntityException);
      expect(createSpy).not.toHaveBeenCalled();
    });

    it('should create and return an user', async () => {
      const email = 'valid_email';

      const findByEmailSpy = jest
        .spyOn(userRepository, 'findByEmail')
        .mockResolvedValueOnce(null);

      const createSpy = jest.spyOn(userRepository, 'create');

      const res = await sut.createUser({ email });
      expect(findByEmailSpy).toHaveBeenCalledWith(email);
      expect(createSpy).toHaveBeenCalled();
      expect(res).toBeDefined();
    });
  });

  describe('deleteUser', () => {
    it('should throw not found error when user is not found', async () => {
      const id = 'any_id';

      jest.spyOn(userRepository, 'findById').mockResolvedValueOnce(null);
      const deleteSpy = jest.spyOn(userRepository, 'delete');

      await expect(sut.deleteUser(id)).rejects.toThrow(NotFoundException);
      expect(deleteSpy).not.toHaveBeenCalled();
    });

    it('should delete user', async () => {
      const id = 'any_id';
      const deleteSpy = jest.spyOn(userRepository, 'delete');

      await sut.deleteUser(id);
      expect(deleteSpy).toHaveBeenCalledWith(id);
    });
  });
});

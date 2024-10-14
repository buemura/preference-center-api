import { NotFoundException } from '@nestjs/common';

import { CreateEventsDto } from '@/modules/consent/dtos';
import { ConsentId } from '@/modules/consent/enums';
import { ConsentRepository } from '@/modules/consent/repositories';
import { CreateEventsUsecase } from '@/modules/consent/usecases';
import { UserService } from '@/modules/user/services/user.service';
import { LoggerMock } from '../../../mocks/logger/logger.mock';
import { ConsentRepositoryMock } from '../../../mocks/repositories/consent.repository.mock';
import {
  USER_MOCK_DATA,
  UserRepositoryMock,
} from '../../../mocks/repositories/user.repository.mock';

describe('CreateEventsUsecase', () => {
  let consentRepository: ConsentRepository;
  let userService: UserService;
  let sut: CreateEventsUsecase;

  const validInput: CreateEventsDto = {
    user: {
      id: 'any_userId',
    },
    consents: [
      {
        id: ConsentId.SMS_NOTIFICATIONS,
        enabled: true,
      },
    ],
  };

  beforeAll(() => {
    consentRepository = new ConsentRepositoryMock();
    userService = new UserService(new UserRepositoryMock());
    sut = new CreateEventsUsecase(
      new LoggerMock(),
      consentRepository,
      userService,
    );
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should throw when user is not found', async () => {
    jest.spyOn(userService, 'getUserById').mockResolvedValueOnce(null);

    const bulkSaveSpy = jest.spyOn(consentRepository, 'bulkSave');

    await expect(sut.execute(validInput)).rejects.toThrow(NotFoundException);
    expect(bulkSaveSpy).not.toHaveBeenCalled();
  });

  it('should save consent and consentEvent', async () => {
    jest
      .spyOn(userService, 'getUserById')
      .mockResolvedValueOnce(USER_MOCK_DATA);

    const bulkSaveSpy = jest.spyOn(consentRepository, 'bulkSave');

    await sut.execute(validInput);
    expect(bulkSaveSpy).toHaveBeenCalled();
  });
});

import { NotFoundException } from '@nestjs/common';

import { ConsentService } from '@/modules/consent/consent.service';
import { CreateEventsDto } from '@/modules/consent/dtos';
import { ConsentId } from '@/modules/consent/enums';
import { ConsentRepository } from '@/modules/consent/repositories';
import { UserService } from '@/modules/user/user.service';
import { ConsentRepositoryMock } from '../../mocks/repositories/consent.repository.mock';
import {
  USER_MOCK_DATA,
  UserRepositoryMock,
} from '../../mocks/repositories/user.repository.mock';
import { LoggerMock } from '../../mocks/logger/logger.mock';

describe('ConsentService', () => {
  let consentRepository: ConsentRepository;
  let userService: UserService;
  let sut: ConsentService;

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
    userService = new UserService(new LoggerMock(), new UserRepositoryMock());
    sut = new ConsentService(new LoggerMock(), consentRepository, userService);
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should throw when user is not found', async () => {
    jest
      .spyOn(userService, 'getUser')
      .mockRejectedValueOnce(new NotFoundException());

    const bulkSaveSpy = jest.spyOn(consentRepository, 'bulkSave');

    await expect(sut.createEvents(validInput)).rejects.toThrow(
      NotFoundException,
    );
    expect(bulkSaveSpy).not.toHaveBeenCalled();
  });

  it('should save consent and consentEvent', async () => {
    jest.spyOn(userService, 'getUser').mockResolvedValueOnce(USER_MOCK_DATA);
    const bulkSaveSpy = jest.spyOn(consentRepository, 'bulkSave');

    await sut.createEvents(validInput);
    expect(bulkSaveSpy).toHaveBeenCalled();
  });
});

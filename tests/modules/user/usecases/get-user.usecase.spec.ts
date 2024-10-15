import { NotFoundException } from '@nestjs/common';

import { Consent } from '@/modules/consent/entities';
import { ConsentId } from '@/modules/consent/enums';
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

  it('should return a user with consents', async () => {
    const mockUser = {
      id: 'any_id',
      email: 'any_email',
      consents: [
        Consent.create({
          consentId: ConsentId.EMAIL_NOTIFICATIONS,
          userId: 'any_id',
          enabled: true,
        }),
        Consent.create({
          consentId: ConsentId.SMS_NOTIFICATIONS,
          userId: 'any_id',
          enabled: false,
        }),
      ],
      consentEvents: [],
    };

    jest.spyOn(userRepository, 'findById').mockResolvedValueOnce(mockUser);

    const result = await sut.execute(mockUser.id);

    expect(result).toEqual({
      id: mockUser.id,
      email: mockUser.email,
      consents: [
        { id: 'email_notifications', enabled: true },
        { id: 'sms_notifications', enabled: false },
      ],
    });
  });
});

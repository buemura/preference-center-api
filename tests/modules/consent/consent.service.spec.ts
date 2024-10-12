import { ConsentService } from '@/modules/consent/consent.service';
import { ConsentRepository } from '@/modules/consent/repositories';
import { ConsentRepositoryMock } from '../../mocks/repositories/consent.repository.mock';
import { CreateEventsDto } from '@/modules/consent/dtos';
import { ConsentId } from '@/modules/consent/enums';

describe('ConsentService', () => {
  let consentRepository: ConsentRepository;
  let sut: ConsentService;

  beforeAll(() => {
    consentRepository = new ConsentRepositoryMock();
    sut = new ConsentService(consentRepository);
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should save consent and consentEvent', async () => {
    const input: CreateEventsDto = {
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

    const bulkSaveSpy = jest.spyOn(consentRepository, 'bulkSave');

    await sut.createEvents(input);
    expect(bulkSaveSpy).toHaveBeenCalled();
  });
});

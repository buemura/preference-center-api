import { IsBoolean, IsEnum, IsNotEmpty, IsUUID } from 'class-validator';

import { ConsentId } from '@/modules/consent/consent.enum';

export class CreateEventDto {
  @IsNotEmpty()
  @IsEnum(ConsentId)
  consentId: ConsentId;

  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @IsNotEmpty()
  @IsBoolean()
  enabled: boolean;
}

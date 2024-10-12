import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsNotEmpty, IsUUID } from 'class-validator';

import { ConsentId } from '@/modules/consent/enums';

export class CreateEventDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(ConsentId)
  consentId: ConsentId;

  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  enabled: boolean;
}

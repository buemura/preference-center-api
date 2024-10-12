import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsUUID,
  Validate,
  ValidateNested,
} from 'class-validator';

import { ConsentId } from '@/modules/consent/enums';
import { Type } from 'class-transformer';

class UserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  id: string;
}

class ConsentDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(ConsentId)
  id: ConsentId;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  enabled: boolean;
}

export class CreateEventsDto {
  @ApiProperty()
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => UserDto)
  user: UserDto;

  @ApiProperty({ type: [ConsentDto] })
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => ConsentDto)
  consents: ConsentDto[];
}

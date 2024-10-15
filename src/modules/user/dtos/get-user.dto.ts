import { ApiProperty } from '@nestjs/swagger';

class UserConsent {
  @ApiProperty()
  id: string;

  @ApiProperty()
  enabled: boolean;
}

export class GetUserResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  consents: UserConsent[];
}

import { ApiProperty } from '@nestjs/swagger';

export class NotFoundSchema {
  @ApiProperty({ example: 'User not found' })
  message: string;

  @ApiProperty({ example: 'Not Found' })
  error: string;

  @ApiProperty({ example: 404 })
  statusCode: number;
}

export class UnprocessableEntitySchema {
  @ApiProperty({ example: 'User already created' })
  message: string;

  @ApiProperty({ example: 'Unprocessable Entity' })
  error: string;

  @ApiProperty({ example: 422 })
  statusCode: number;
}

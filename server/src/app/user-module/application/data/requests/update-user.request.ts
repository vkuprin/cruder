import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateUserRequest {
  @ApiProperty()
  @IsString()
  practitionerId: string;

  @ApiProperty()
  @IsString()
  namePrefix: string;

  @ApiProperty()
  @IsString()
  fullName: string;

  @ApiProperty()
  @IsString()
  phoneNumber: string;
}

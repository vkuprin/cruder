import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateInvitationRequest {
  @ApiProperty()
  @IsString()
  userId: string;
}

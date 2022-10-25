import { IsArray, IsOptional, IsString, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { SignUpRequest } from '../../../../user-module/application/data/requests/sign-up.request';

export class CreateProviderRequest {
  @ApiProperty()
  @IsString()
  domainName: string;

  @ApiProperty()
  @IsString()
  sentence: string;

  @ApiProperty()
  @IsString()
  url: string;

  @ApiProperty({ type: [SignUpRequest], required: false })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SignUpRequest)
  users?: SignUpRequest[];
}

import { IsEnum, IsString, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PermissionEnum } from '../../../../shared-module/application/enums/permission.enum';

export class UpdateUserTypeRequest {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty({ enum: PermissionEnum })
  @IsEnum(PermissionEnum)
  @Matches(
    `^${Object.values(PermissionEnum)
      .filter((v) => typeof v !== 'number')
      .join('|')}$`,
    'i',
  )
  permission: PermissionEnum;
}

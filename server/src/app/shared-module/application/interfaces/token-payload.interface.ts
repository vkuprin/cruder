import { PermissionEnum } from '../enums/permission.enum';

export interface TokenPayload {
  email: string;
  domain: string;
  userType: string;
  userId: string;
  permission: PermissionEnum;
}

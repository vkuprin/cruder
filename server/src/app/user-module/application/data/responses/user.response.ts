import { UserTypeResponse } from '../../../../user-type-module/application/data/responses/user-type.response';
import { UserEntity } from '../entities/user.entity';

export interface UserResponse {
  id: string;
  namePrefix: string;
  userType: UserTypeResponse;
  fullName: string;
  email: string;
  providerId: string;
  active: boolean;
  prac?: string;
  phoneNumber?: string;
  practitionerId?: string;
}

export class UserResponseBuilder {
  static build(userEntity: UserEntity): UserResponse {
    return {
      id: userEntity.id,
      fullName: userEntity.fullName,
      namePrefix: userEntity.namePrefix,
      email: userEntity.email,
      userType: {
        id: userEntity.userType.id,
        name: userEntity.userType.name,
        permission: userEntity.userType.permission,
      },
      providerId: userEntity.providerId,
      active: userEntity.active,
      practitionerId: userEntity?.practitionerId,
      phoneNumber: userEntity?.phoneNumber,
    };
  }
}

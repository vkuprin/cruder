import { UserTypeEntity } from '../../../../src/app/user-type-module/application/entities/user-type.entity';
import { PermissionEnum } from '../../../../src/app/shared-module/application/enums/permission.enum';
import { UserTypeResponse } from '../../../../src/app/user-type-module/application/data/responses/user-type.response';
import { CreateUserTypeRequest } from '../../../../src/app/user-type-module/application/data/requests/create-user-type.request';
import { UpdateUserTypeRequest } from '../../../../src/app/user-type-module/application/data/requests/update-user-type.request';

const createdAt = new Date();
const updatedAt = new Date();

const userTypeEntityMock1: UserTypeEntity = {
  id: 'userType1',
  name: 'CMO',
  permission: PermissionEnum.Admin,
  createdAt,
  updatedAt,
};

const userTypeEntityMock2: UserTypeEntity = {
  id: 'userType2',
  name: 'Physician',
  permission: PermissionEnum.User,
  createdAt,
  updatedAt,
};

const userTypeResponseMock1: UserTypeResponse = {
  id: 'userType1',
  name: 'CMO',
  permission: PermissionEnum.Admin,
};

const userTypeResponseMock2: UserTypeResponse = {
  id: 'userType2',
  name: 'Physician',
  permission: PermissionEnum.User,
};

const createUserTypeRequestMock1: CreateUserTypeRequest = {
  name: 'CMO',
  permission: PermissionEnum.Admin,
};

const updateUserTypeRequestMock1: UpdateUserTypeRequest = {
  name: 'CMO',
  permission: PermissionEnum.Admin,
};

const updatedUserTypeEntityMock1: UserTypeEntity = {
  id: userTypeEntityMock1.id,
  name: 'CMOUpdated',
  permission: PermissionEnum.Admin,
  createdAt: userTypeEntityMock1.createdAt,
  updatedAt: userTypeEntityMock1.updatedAt,
};

const updatedUserTypeResponseMock1: UserTypeResponse = {
  id: userTypeEntityMock1.id,
  name: 'CMOUpdated',
  permission: PermissionEnum.Admin,
};

export class UserTypeMock {
  static get entity1(): UserTypeEntity {
    return userTypeEntityMock1;
  }

  static get entity2(): UserTypeEntity {
    return userTypeEntityMock2;
  }

  static get updatedEntity1(): UserTypeEntity {
    return updatedUserTypeEntityMock1;
  }

  static get createUserTypeRequest1(): CreateUserTypeRequest {
    return createUserTypeRequestMock1;
  }

  static get updateUserTypeRequest1(): UpdateUserTypeRequest {
    return updateUserTypeRequestMock1;
  }

  static get response1(): UserTypeResponse {
    return userTypeResponseMock1;
  }

  static get response2(): UserTypeResponse {
    return userTypeResponseMock2;
  }

  static get updatedResponse1(): UserTypeResponse {
    return updatedUserTypeResponseMock1;
  }
}

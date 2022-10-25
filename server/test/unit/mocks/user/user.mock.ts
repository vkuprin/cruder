import { UserEntity } from '../../../../src/app/user-module/application/data/entities/user.entity';
import { UserTypeMock } from './user-type.mock';
import { SignUpRequest } from '../../../../src/app/user-module/application/data/requests/sign-up.request';
import { UserResponse } from '../../../../src/app/user-module/application/data/responses/user.response';

const createdAt = new Date();
const updatedAt = new Date();

const userEntityMock1: UserEntity = {
  id: 'userFakeId',
  active: true,
  namePrefix: 'Dr.',
  userType: UserTypeMock.entity1,
  userTypeId: UserTypeMock.entity1.id,
  email: 'email@gmail.com',
  phoneNumber: '+380543757645',
  fullName: 'Fake User',
  password: 'fakePassword',
  createdAt,
  updatedAt,
  providerId: undefined,
  provider: undefined,
  invitations: [],
};

const userEntityMock2: UserEntity = {
  id: 'userFakeId2',
  active: true,
  namePrefix: 'Dr.',
  userType: UserTypeMock.entity2,
  userTypeId: UserTypeMock.entity2.id,
  email: 'email2@gmail.com',
  phoneNumber: '+380641757649',
  fullName: 'Fake User 2',
  password: 'fakePassword',
  createdAt,
  updatedAt,
  providerId: undefined,
  provider: undefined,
  invitations: [],
};

const signUpRequestMock1: SignUpRequest = {
  namePrefix: 'Dr.',
  userTypeId: UserTypeMock.entity1.id,
  fullName: 'Fake User',
  email: 'email@gmail.com',
  password: 'fakePassword',
  active: true,
};

const signUpRequestMock2: SignUpRequest = {
  namePrefix: 'Dr.',
  userTypeId: UserTypeMock.entity2.id,
  fullName: 'Fake User 2',
  email: 'email2@gmail.com',
  password: 'fakePassword',
  active: true,
};

const userResponseMock1: UserResponse = {
  id: 'userFakeId',
  namePrefix: 'Dr.',
  userType: UserTypeMock.response1,
  fullName: 'Fake User',
  email: 'email@gmail.com',
  active: true,
  providerId: undefined,
  phoneNumber: '+380543757645',
};

const userResponseMock2: UserResponse = {
  id: 'userFakeId2',
  namePrefix: 'Dr.',
  userType: UserTypeMock.response2,
  fullName: 'Fake User 2',
  email: 'email2@gmail.com',
  active: true,
  providerId: undefined,
  phoneNumber: '+380641757649',
};

export class UserMock {
  static get entity1(): UserEntity {
    return userEntityMock1;
  }

  static get entity2(): UserEntity {
    return userEntityMock2;
  }

  static get signUpRequest1(): SignUpRequest {
    return signUpRequestMock1;
  }

  static get signUpRequest2(): SignUpRequest {
    return signUpRequestMock2;
  }

  static get response1(): UserResponse {
    return userResponseMock1;
  }

  static get response2(): UserResponse {
    return userResponseMock2;
  }
}

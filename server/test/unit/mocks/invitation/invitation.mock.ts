import { InvitationEntity } from '../../../../src/app/invitation-module/application/data/entities/invitation.entity';
import { UserMock } from '../user/user.mock';
import { InvitationResponse } from '../../../../src/app/invitation-module/application/data/responses/invitation.response';
import { CreateInvitationRequest } from '../../../../src/app/invitation-module/application/data/requests/create-invitation.request';

const createdAt = new Date();
const updatedAt = new Date();

const invitationEntityMock1: InvitationEntity = {
  id: 'invitationFakeId',
  key: 'fakeKey',
  accepted: false,
  createdAt,
  updatedAt,
  user: UserMock.entity1,
  userId: UserMock.entity1.id,
};

const createInvitationMock1: CreateInvitationRequest = {
  userId: 'userFakeId',
};

const invitationResponseMock1: InvitationResponse = {
  userId: 'userFakeId',
  id: 'invitationFakeId',
  createdAt,
  accepted: false,
};

export class InvitationMock {
  static get entity1(): InvitationEntity {
    return invitationEntityMock1;
  }

  static get createRequest1(): CreateInvitationRequest {
    return createInvitationMock1;
  }

  static get response1(): InvitationResponse {
    return invitationResponseMock1;
  }
}

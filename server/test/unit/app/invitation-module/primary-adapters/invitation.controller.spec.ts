import { InvitationController } from '../../../../../src/app/invitation-module/primary-adapters/invitation.controller';
import { InvitationMock } from '../../../mocks/invitation/invitation.mock';
import { CreateInvitationUsecase } from '../../../../../src/app/invitation-module/application/usecase/internal/create-invitation.usecase';
import { ActivateInvitationUsecase } from '../../../../../src/app/invitation-module/application/usecase/internal/activate-invitation.usecase';
import { GetInvitationsListUsecase } from '../../../../../src/app/invitation-module/application/usecase/internal/get-invitations-list.usecase';

describe('InvitationController', () => {
  let invitationController: InvitationController;
  let createInvitationUsecase: CreateInvitationUsecase;
  let activateInvitationUsecase: ActivateInvitationUsecase;
  let getInvitationsListUsecase: GetInvitationsListUsecase;

  beforeEach(() => {
    createInvitationUsecase = new CreateInvitationUsecase({} as any, {} as any);
    activateInvitationUsecase = new ActivateInvitationUsecase(
      {} as any,
      {} as any,
    );
    getInvitationsListUsecase = new GetInvitationsListUsecase({} as any);
    invitationController = new InvitationController(
      createInvitationUsecase,
      activateInvitationUsecase,
      getInvitationsListUsecase,
    );
  });

  describe('# create', () => {
    it('should return created invitation', async () => {
      const createInvitationRequest = InvitationMock.createRequest1;
      const invitationResponseMock1 = InvitationMock.response1;

      const createMock = jest
        .spyOn(createInvitationUsecase, 'execute')
        .mockImplementation(() => Promise.resolve(invitationResponseMock1));

      const res = await invitationController.create(createInvitationRequest);

      expect(res).toEqual(invitationResponseMock1);
      expect(createMock.mock.calls.length).toBe(1);
    });
  });

  describe('# activateInvitation', () => {
    it('should return activated invitation', async () => {
      const activateInvitationMock = jest
        .spyOn(activateInvitationUsecase, 'execute')
        .mockImplementation(() => Promise.resolve());

      const res = await invitationController.activateInvitation('fakeKey');

      expect(res).toEqual(undefined);
      expect(activateInvitationMock.mock.calls.length).toBe(1);
    });
  });

  describe('# getAllInvitations', () => {
    it('should return list of invitations', async () => {
      const invitationResponseMock1 = InvitationMock.response1;

      const getInvitationsListUsecaseMock = jest
        .spyOn(getInvitationsListUsecase, 'execute')
        .mockImplementation(() => Promise.resolve([invitationResponseMock1]));

      const res = await invitationController.getAllInvitations();

      expect(res).toEqual([invitationResponseMock1]);
      expect(getInvitationsListUsecaseMock.mock.calls.length).toBe(1);
    });
  });
});
